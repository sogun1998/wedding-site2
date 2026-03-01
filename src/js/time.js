import { data } from "../assets/data/data.js";

export const time = () => {
    const timeContainer = document.querySelector('.time');
    const [marriageDiv, receptionDiv] = timeContainer.querySelectorAll('div div');

    const createTimeListItem = (title, details) => (
        `<h3>${title}</h3>
         <br>
         <p>${details.hours.start} ${details.day}, ngày ${details.date}/${details.month}/${details.year} <br> 
         Đ/c:  ${details.address} </p>
         <a href="${details.map}" role="link" target="_blank" aria-label="link google maps" data-aos="zoom-in" data-aos-duration="1000">
        <i class="bx bxs-map-alt" aria-hidden="true"></i>
        <span> google maps</span>
         </a>`

    );

    marriageDiv.innerHTML = createTimeListItem('Nhà gái', data.time.marriage);
    receptionDiv.innerHTML = createTimeListItem('Nhà trai', data.time.reception);
    };
