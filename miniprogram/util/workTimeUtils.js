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

console.log(weekDay(new Date()));

module.exports = {
  countDays, weekDay
}