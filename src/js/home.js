import { data } from "../assets/data/data.js";
import { monthNameToNumber } from "../utils/helper.js";

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
        return `
        <time datetime="${year}-${String(monthNameToNumber(month)).padStart(2, '0')}-${String(date).padStart(2, '0')}">
            ${day}, ${date} ${month} ${year}
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

    const monthMap = {
        January: 1,
        February: 2,
        March: 3,
        April: 4,
        May: 5,
        June: 6,
        July: 7,
        August: 8,
        September: 9,
        October: 10,
        November: 11,
        December: 12,
    };

    let countdownInterval = null;

    const startCountdown = (homeTime, timeData) => {
        const { year, month, date } = timeData.reception;

        const monthNum = monthMap[month];

        if (!monthNum) {
            console.error("Month không hợp lệ:", month);
            return;
        }

        // Dùng constructor số để tránh bug timezone
        const endTime = new Date(year, monthNum - 1, date, 0, 0, 0);

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
