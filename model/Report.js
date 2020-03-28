let timerName;
let beginTime;
let endTime;
let actualTime;
let date;
let reports = [];

let Report = function (report) {
    this.timerName = report.timerName;
    this.beginTime = report.beginTime;
    this.endTime = report.endTime;
    this.actualTime = report.actualTime;
    this.date = report.date;
};

function createReport() {
    if (timerName !== undefined && date !== undefined && (seconds !== 0 || minutes !== 0 || hours !== 0)) {
        endTime = getCurrentTime();
        actualTime = getActualTime();
        fillTableByDefault();
        changeButtonsDisplay();
    }
}

self.onmessage = event => {
    if (event.data !== "") {
        reports.push(event.data);
    }
    this.postMessage(reports);
};
