'use strict';

const currentTime = document.querySelector('.currentTime');
const currentDate = document.querySelector('.currentDate');
const options = {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
}


setInterval(getCurrentTime, 1000);
setTimeout(getCurrentDate, 1000);

function getCurrentTime() {
    const date = new Date();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    currentTime.innerText = `${hour < 10 ? `0${hour}` : hour}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

function getCurrentDate() {
    const date = new Date();
    currentDate.innerText = date.toLocaleDateString('en-US', options);
}



