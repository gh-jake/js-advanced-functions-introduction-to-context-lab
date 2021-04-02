// Your code here
function createEmployeeRecord(array) {
    return {
        firstName: array[0] ,
        familyName: array[1] ,
        title: array[2] ,
        payPerHour: array[3] ,
        timeInEvents: [] ,
        timeOutEvents: []
    };
}

function createEmployeeRecords(array) {
    return array.map(employee => createEmployeeRecord(employee));
}

function createTimeInEvent(record, dateTime) {
    let timeInEvent = {
        type: "TimeIn",
        date: dateTime.slice(0, 10) ,
        hour: parseInt(dateTime.slice(11))
    }
    record.timeInEvents.push(timeInEvent);
    return record;
}

function createTimeOutEvent(record, dateTime) {
    let timeOutEvent = {
        type: "TimeOut",
        date: dateTime.slice(0, 10) ,
        hour: parseInt(dateTime.slice(11))
    }
    record.timeOutEvents.push(timeOutEvent);
    return record;
}

function hoursWorkedOnDate(record, dateInput) {
    let timeOutHour = record.timeOutEvents.find(e => e.date === dateInput).hour;//forEach(time => {
    let timeInHour = record.timeInEvents.find(e => e.date === dateInput).hour;
    return (timeOutHour - timeInHour) / 100;
}

function wagesEarnedOnDate(record, date) {
    return record.payPerHour * hoursWorkedOnDate(record, date);
}

function allWagesFor(record) {
    let wages = record.timeInEvents.map(day => wagesEarnedOnDate(record, day.date));
    return wages.reduce((added, start) => added + start);
}

function findEmployeeByFirstName(records, nameInput) {
    return records.find(record => record.firstName === nameInput);
}

function calculatePayroll(employees) {
    let pay = employees.map(employee => allWagesFor(employee));
    return pay.reduce((added, start) => added + start);
}