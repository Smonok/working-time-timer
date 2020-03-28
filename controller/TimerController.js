let interval;
let seconds = 0;
let minutes = 0;
let hours = 0;

function startTimer() {
    let distance = seconds * 1000 + minutes * 1000 * 60 + hours * 1000 * 60 * 60;

    interval = setInterval(function () {
        hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((distance % (1000 * 60)) / 1000);

        distance += 1000;
        stopIf12hours(distance);

        printActualTime();
    }, 1000);
}

function stopIf12hours(distance) {
    if (distance > 1000 * 60 * 60 * 12) {
        clearInterval(interval);
    }
}

function saveBeginDate() {
    if (seconds === 0 && minutes === 0 && hours === 0) {
        beginTime = getCurrentTime();
        date = new Date();
    }
}

function getCurrentTime() {
    let today = new Date();
    return addZeroAtBegin(today.getHours()) + ':'
        + addZeroAtBegin(today.getMinutes()) + ':'
        + addZeroAtBegin(today.getSeconds());
}

function getActualTime() {
    return addZeroAtBegin(hours) + ':' + addZeroAtBegin(minutes) + ':' + addZeroAtBegin(seconds);
}

function isCurrentDay(date) {
    return date.getDate() === new Date().getDate()
        && date.getMonth() === new Date().getMonth()
        && date.getFullYear() === new Date().getFullYear();
}

function isCurrentWeek(date) {
    const weekStart = new Date().getDate() - new Date().getDay() + 1;
    const weekEnd = weekStart + 6;

    return (weekStart <= date.getDate() <= weekEnd)
        && date.getFullYear() === new Date().getFullYear()
        && date.getMonth() === new Date().getMonth();
}

function isCurrentMonth(date) {
    return date.getMonth() === new Date().getMonth()
        && date.getFullYear() === new Date().getFullYear();
}

function resetTime() {
    seconds = 0;
    minutes = 0;
    hours = 0;
}
