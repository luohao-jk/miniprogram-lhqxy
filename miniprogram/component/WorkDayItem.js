const { newWorkTime, countDays } = require("../util/workTimeUtils");

function isToday(date) {
  if (date == null) {
    return false;
  }

  let dateObj = new Date(date);
  let today = new Date();

  return dateObj.getFullYear() === today.getFullYear() && dateObj.getMonth() === today.getMonth() 
          && dateObj.getDate() === today.getDate();
}
 
// component/WorkDayItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    date: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    workDay: "",
    dateObj: "",
    year: 0,
    month: 0,
    day: "",
    hintText: "",
    boxClass: "work-day-box",
    dayClass: "day",
    workClass: "work"
  },

  lifetimes: {
    attached() {
      if (this.data.date === "EMPTY") {
        return;
      }
      if (isToday(this.data.date)) {
        this.setData({
          boxClass: "work-day-box today",
          workClass: "work today"
        })
      }
      let dateObj = new Date(this.data.date)
      let workDay = newWorkTime(dateObj);
      let hintText = workDay.workDay + ".";
      if (workDay.lunar.IDayCn === "初一") {
        hintText += workDay.lunar.IMonthCn;
      } else {
        hintText += workDay.lunar.IDayCn
      }
      hintText = workDay.lunar.lunarFestival || workDay.lunar.festival || hintText;
      this.setData({
        year: dateObj.getFullYear(),
        month: dateObj.getMonth(),
        day: dateObj.getDate(),
        dateObj: dateObj,
        workDay: workDay,
        hintText: hintText
      });

      if (workDay.lunar.festival || workDay.lunar.lunarFestival) {
        this.setData({
          workClass: this.data.workClass + " festival"
        })
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setSelect() {
      if (isToday(this.data.date)) {
        return;
      }
      this.setData({
        boxClass: "work-day-box selected",
      });
    },

    unSelect() {
      if (isToday(this.data.date)) {
        return;
      }
      this.setData({
        boxClass: "work-day-box",
      });
    }
  }
})
