let worker = new Worker("./model/Report.js");
let rowsCount = 0;

function changeTableBySelect() {
    clearTableBody();
    let selectedValue = document.getElementById("select-time-period").value;

    worker.postMessage("");
    worker.onmessage = event => {
        switch (selectedValue) {
            case("day"):
                printCurrentDayReports(event.data);
                break;
            case("week"):
                printCurrentWeekReports(event.data);
                break;
            case("month"):
                printCurrentMonthReports(event.data);
                break;
            case("all-time"):
                printAllTimeReports(event.data);
                break;
        }
    }
}

function printCurrentDayReports(reports) {
    reports.forEach(report => {
        if (isCurrentDay(report.date)) {
            addTableRow(report);
        }
    });
}

function printCurrentWeekReports(reports) {
    reports.forEach(report => {
        if (isCurrentWeek(report.date)) {
            addTableRow(report);
        }
    });
}

function printCurrentMonthReports(reports) {
    reports.forEach(report => {
        if (isCurrentMonth(report.date)) {
            addTableRow(report);
        }
    });
}

function printAllTimeReports(reports) {
    reports.forEach(report => addTableRow(report));
}

function fillTableByDefault() {
    let report = new Report({
        timerName: timerName,
        beginTime: beginTime,
        endTime: endTime,
        actualTime: actualTime,
        date: date
    });
    worker.postMessage(report);

    worker.onmessage = event => {
        if (rowsCount === 0) {
            printIntoTable(event.data[rowsCount]);
            rowsCount++;
        } else {
            addTableRow(event.data[rowsCount]);
        }
    }
}

function printIntoTable(report) {
    document.getElementById("name").innerHTML = report.timerName;
    document.getElementById("date").innerHTML = formatDate(report.date);
    document.getElementById("start-time").innerHTML = report.beginTime;
    document.getElementById("end-time").innerHTML = report.endTime;
    document.getElementById("actual-time").innerHTML = report.actualTime;
}

function addTableRow(report) {
    let reportTable = document.getElementById('report-table');
    let tableRef = reportTable.getElementsByTagName('tbody')[0];
    let newRow = tableRef.insertRow();

    rowsCount++;
    addCell(newRow, 0, rowsCount.toString());
    addCell(newRow, 1, report.timerName);
    addCell(newRow, 2, formatDate(report.date));
    addCell(newRow, 3, report.beginTime);
    addCell(newRow, 4, report.endTime);
    addCell(newRow, 5, report.actualTime);
}

function addCell(newRow, cellIndex, text) {
    let newCell = newRow.insertCell(cellIndex);
    let newText = document.createTextNode(text);
    newCell.appendChild(newText);
}

function clearTableBody() {
    let Parent = document.getElementById("tbody");

    if (rowsCount !== 0) {
        while (Parent.hasChildNodes()) {
            Parent.removeChild(Parent.firstChild);
        }
    }
    rowsCount = 0;
}
