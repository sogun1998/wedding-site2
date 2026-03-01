import { data } from "../assets/data/data.js";

export const home = () => {
    const homeContainer = document.querySelector('.home');
    const [_, figureElement, timeElement, homeTime, calendarAnchor] = homeContainer.children;

    const generateFigureContent = ({ bride }) => {
        const { L: { name: brideLName }, P: { name: bridePName }, couple: coupleImage } = bride;
        return `
            <img src="${coupleImage}" alt="couple animation">
            <figcaption>
                Nguyễn Đức Anh & Phạm Thị Thanh
            </figcaption>`;
    };

    const generateTimeContent = ({ time }) => {
        const { year, month, date, day } = time.reception;
        const monthPadded = String(month).padStart(2, '0');
        const datePadded = String(date).padStart(2, '0');
        return `
        <time datetime="${year}-${monthPadded}-${datePadded}">
            ${day}, ${date}/${month}/${year}
        </time>`;
    };

    const generateCountdownMarkup = (days, hours, minutes, seconds) => {
        return `<div>
                    <p>${days}<br><span>Ngày</span></p>
                </div>
                <div>
                    <p>${hours}<br><span>Giờ</span></p>
                </div>
                <div>
                    <p>${minutes}<br><span>Phút</span></p>
                </div>
                <div>
                    <p>${seconds}<br><span>Giây</span></p>
                </div>`;
    };

    const updateCountdown = (endTime, homeTime) => {
        const now = new Date().getTime();
        const distance = endTime - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance < 0) {
            clearInterval(intervalId);
            homeTime.innerHTML = generateCountdownMarkup(0, 0, 0, 0);
        } else {
            homeTime.innerHTML = generateCountdownMarkup(days, hours, minutes, seconds);
        }
    };

    let countdownInterval = null;

    const startCountdown = (homeTime, timeData) => {
        const { year, month, date } = timeData.reception;
        const monthNum = parseInt(month, 10);

        if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
            console.error("Tháng không hợp lệ:", month);
            return;
        }

        // Date constructor: tháng 0-indexed (0 = Jan, 11 = Dec)
        const endTime = new Date(Number(year), monthNum - 1, Number(date), 0, 0, 0);

        console.log("Countdown target:", endTime);

        updateCountdown(endTime, homeTime);

        // clear interval cũ nếu có
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }

        countdownInterval = setInterval(() => {
            updateCountdown(endTime, homeTime);
        }, 1000);
    };

    const initializeHome = () => {
        const { bride, time, link } = data;
        figureElement.innerHTML = generateFigureContent({ bride });
        timeElement.innerHTML = generateTimeContent({ time });
        calendarAnchor.href = link.calendar;
        startCountdown(homeTime, time);
    };

    initializeHome();
};
