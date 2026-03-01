import {
    formattedDate,
    formattedName,
    generateRandomColor,
    generateRandomId,
    getCurrentDateTime,
    renderElement
} from "../utils/helper.js";
import {data} from "../assets/data/data.js";
import {comentarService} from "../services/comentarService.js";

export const wishas = () => {
    const wishasContainer = document.querySelector('.wishas');
    const form = document.getElementById('form-wishas');
    const buttonForm = document.getElementById('btn-submit-wishas');
    const feedbackEl = document.getElementById('wishas-feedback');
    const peopleComentar = document.getElementById('wishas-people-count');
    const containerComentar = document.getElementById('wishas-comentar-list');
    const pageNumber = wishasContainer?.querySelector('.page-number');
    const prevNextButtons = wishasContainer?.querySelectorAll('.button-grup button');
    const prevButton = prevNextButtons?.[0];
    const nextButton = prevNextButtons?.[1];

    if (!form || !buttonForm) return;

    const listItemBank = (data) => (
        `  <figure data-aos="zoom-in" data-aos-duration="1000">
                <img src=${data.icon} alt="bank icon animation">
                <figcaption> VCB ${data.rekening} <br>Tên TK: ${data.name} <br>Mừng cưới đến ${data.prefix_name}</figcaption>
           </figure>`
    );

    const initialBank = () => {
        const containerBank = document.getElementById('wishas-bank-container');
        if (!containerBank) return;
        renderElement(data.bank, containerBank, listItemBank);
    };

    const listItemComentar = (data) => {
        const name = formattedName(data.name);
        const newDate = formattedDate(data.date);
        let date = "";

        if (newDate.days < 1) {
            if (newDate.hours < 1) {
                date = `${newDate.minutes} phút trước`;
            } else {
                date = `${newDate.hours} giờ, ${newDate.minutes} phút trước`;
            }
        } else {
            date = `${newDate.days} ngày, ${newDate.hours} giờ trước`;
        }

        return ` <li data-aos="zoom-in" data-aos-duration="1000">
                     <div style="background-color: ${data.color}">${data.name.charAt(0).toUpperCase()}</div>
                     <div>
                         <h4>${name}</h4>
                         <p>${date} <br>${data.status}</p>
                         <p>${data.message}</p>
                     </div>
                 </li>`;
    };

    let lengthComentar;

    const initialComentar = async () => {
        if (!containerComentar || !peopleComentar || !pageNumber) return;
        containerComentar.innerHTML = `<h1 style="font-size: 1rem; margin: auto">Loading...</h1>`;
        peopleComentar.textContent = '...';
        pageNumber.textContent = '..';

        try {
            const response = await comentarService.getComentar();
            if (response.error) {
                peopleComentar.textContent = 'Không tải được lời chúc';
                pageNumber.textContent = '1';
                containerComentar.innerHTML = '';
                return;
            }
            const comentar = response.comentar || [];
            lengthComentar = comentar.length;
            comentar.reverse();

            if (comentar.length > 0) {
                peopleComentar.textContent = `${comentar.length} người đã gửi lời chúc`;
            } else {
                peopleComentar.textContent = `Chưa có ai gửi lời chúc`;
            }

            pageNumber.textContent = '1';
            renderElement(comentar.slice(startIndex, endIndex), containerComentar, listItemComentar);
        } catch (error) {
            peopleComentar.textContent = 'Lỗi tải dữ liệu';
            pageNumber.textContent = '1';
            containerComentar.innerHTML = '';
        }
    };

    const showFeedback = (message, isError = false) => {
        if (!feedbackEl) return;
        feedbackEl.textContent = message;
        feedbackEl.style.color = isError ? '#c0392b' : '#27ae60';
        feedbackEl.style.marginTop = '0.5rem';
    };

    form.addEventListener('submit', (e) => e.preventDefault());

    buttonForm.addEventListener('click', async () => {
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        showFeedback('');
        buttonForm.disabled = true;
        buttonForm.textContent = 'Đang gửi...';

        const comentar = {
            id: generateRandomId(),
            name: form.name.value.trim(),
            status: form.status.value === 'y' ? 'Đến' : 'Không đến',
            message: form.message.value.trim(),
            date: getCurrentDateTime(),
            color: generateRandomColor(),
        };

        try {
            const result = await comentarService.addComentar(comentar);

            if (result.ok) {
                showFeedback('Đã gửi lời chúc! Cảm ơn bạn.');
                lengthComentar = (lengthComentar || 0) + 1;
                if (peopleComentar) peopleComentar.textContent = `${lengthComentar} người đã gửi lời chúc`;
                if (containerComentar) containerComentar.insertAdjacentHTML('afterbegin', listItemComentar(comentar));
                form.reset();
            } else {
                showFeedback(result.error || 'Gửi thất bại, vui lòng thử lại.', true);
            }
        } catch (err) {
            showFeedback(err && err.message ? err.message : 'Lỗi kết nối, vui lòng thử lại.', true);
        } finally {
            buttonForm.disabled = false;
            buttonForm.textContent = 'Gửi lời chúc';
        }
    });

    // click prev & next
    let currentPage = 1;
    let itemsPerPage = 4;
    let startIndex = 0;
    let endIndex = itemsPerPage;

    const updatePageContent = async () => {
        if (!containerComentar || !pageNumber || !prevButton || !nextButton) return;
        containerComentar.innerHTML = '<h1 style="font-size: 1rem; margin: auto">Loading...</h1>';
        pageNumber.textContent = '..';
        prevButton.disabled = true;
        nextButton.disabled = true;

        try {
            const response = await comentarService.getComentar();
            if (response.error) {
                containerComentar.innerHTML = '';
                pageNumber.textContent = currentPage.toString();
                return;
            }
            const comentar = response.comentar || [];
            comentar.reverse();

            renderElement(comentar.slice(startIndex, endIndex), containerComentar, listItemComentar);
            pageNumber.textContent = currentPage.toString();
        } catch (error) {
            console.error(error);
        } finally {
            prevButton.disabled = false;
            nextButton.disabled = false;
        }
    };

    nextButton?.addEventListener('click', async () => {
        if (endIndex <= lengthComentar) {
            currentPage++;
            startIndex = (currentPage - 1) * itemsPerPage;
            endIndex = startIndex + itemsPerPage;
            await updatePageContent();
        }
    });

    prevButton?.addEventListener('click', async () => {
        if (currentPage > 1) {
            currentPage--;
            startIndex = (currentPage - 1) * itemsPerPage;
            endIndex = startIndex + itemsPerPage;
            await updatePageContent();
        }
    });

    initialComentar().then();
    initialBank();
};
