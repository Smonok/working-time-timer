function start() {
    if (typeof (Worker) !== "undefined") {
        timerName = document.getElementById("timer-name").value;
        if (timerName !== "") {
            changeButtonsDisplay();
            saveBeginDate();
            startTimer();
        } else {
            alert("Please, enter the timer name!");
        }
    } else {
        alert("Sorry! No Web Worker support...");
    }
}

function stop() {
    createReport();
    clearInterval(interval);
    resetTime();
    printActualTime(0, 0);
}

function pause() {
    changeButtonsDisplay();
    clearInterval(interval);
}

function changeButtonsDisplay() {
    let startDisplay = document.getElementById("start").style.display;

    if (startDisplay === "inline") {
        document.getElementById("start").style.display = "none";
        document.getElementById("pause").style.display = "inline";
    } else {
        document.getElementById("start").style.display = "inline";
        document.getElementById("pause").style.display = "none";
    }
}
