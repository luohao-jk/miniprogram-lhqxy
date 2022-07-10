const { newWorkTime } = require("../util/workTimeUtils");

// component/WorkDayItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    date: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    workDay: null
  },

  lifetimes: {
    attached() {
      this.setData({
        workDay: newWorkTime(this.date)
      });
      console.log(this.data.date)
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
  }
})
