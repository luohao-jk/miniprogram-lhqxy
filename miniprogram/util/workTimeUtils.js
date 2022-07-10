const { calendar } = require('../libs/calendar.js');
//起始日期中隔了多少天
let countDays = function(beginDate, endDate) {
  if (endDate == null) {
    endDate = beginDate;
    beginDate = new Date("1970-01-01");
  }

  let beginDateDays = beginDate.getTime() / (60 * 60 * 1000 * 24);
  let endDateDays = endDate.getTime() / (60 * 60 * 1000 * 24);
  return Math.floor(endDateDays - beginDateDays);
}

let weekDay = function(date = new Date()) {
  let countDay = countDays(date);
  return (countDay + 4) % 7;
}

let workFlow = ['治疗', '护理', '一班', '三班', '二班', '休'];
let weekFlow = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
let workDay = function (date = new Date()) {
    let countDay = countDays(new Date("2022-07-05"), date);
    return workFlow[countDay % 6];
}

let newWorkTime = function (date = new Date()) {
  let lunar = calendar.solar2lunar(date.getFullYear(), date.getMonth() + 1, date.getDate());
  let workDayText = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  workDayText = workDayText + "、" + lunar.IMonthCn + lunar.IDayCn;
  workDayText = workDayText + "、" + weekFlow[weekDay(date)] + "、" + workDay(date);
  
  return {
    date: date,
    lunar: lunar,
    weekDay: weekDay(date),
    workDay: workDay(date),
    workDayText: workDayText
  };
}

module.exports = {
  countDays, weekDay, newWorkTime
}