function printCurrentDate() {
    document.getElementById("current-date").innerHTML = formatDate(new Date());
}

function formatDate(date) {
    return addZeroAtBegin(date.getDate()) + '.'
        + addZeroAtBegin((date.getMonth() + 1)) + '.'
        + date.getFullYear();
}

function printCurrentTime() {
    document.getElementById("current-time").innerHTML = getCurrentTime();
    setTimeout(printCurrentTime, 500);
}

function printActualTime() {
    document.getElementById("timer-output").innerHTML = getActualTime();
}

function addZeroAtBegin(number) {
    if (number < 10) {
        return '0' + number;
    }
    return number;
}
