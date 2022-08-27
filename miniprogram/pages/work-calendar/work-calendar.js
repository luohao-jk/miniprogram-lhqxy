// pages/work-calendar/work-calendar.js

const { weekDay, monthMaxDay, newWorkTime } = require("../../util/workTimeUtils");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    monthList: [],
    loopDate: new Date(),
    showDetial: true,
    detailFirstLine: "",
    detailSedLine: "",
    lastSelected: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({loopDate: new Date()})
    this.loadNextYear();
  },

  loadNextYear() {
    let monthList = this.data.monthList;
    let loopDate = this.data.loopDate;
    for (let i = 0; i < 12; i++) {
      monthList.push(this.createMonthObj(loopDate))
      loopDate.setMonth(loopDate.getMonth() + 1)
    }
    this.setData({monthList: monthList})
  },

  createMonthObj(date = new Date()) {
    date.setDate(1);
    let paddingDayNum = weekDay(date) - 1;
    if (paddingDayNum < 0) {
      paddingDayNum += 7;
    }
    
    let dayList = [];
    for(let i = 0; i < paddingDayNum; i++) {
      dayList.push("EMPTY");
    }
  
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    let maxDay = monthMaxDay(date);
    for (let i = 1; i <= maxDay; i++) {
      let day = i < 10 ? "0" + i : i;
      dayList.push(year + "-" + month + "-" + day)
    }
  
    return {
      title: year + "年" + month + "月",
      dateList: dayList
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.doSetDetail(new Date())
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.loadNextYear();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  showDetail(e) {
    let selectDayText = e.currentTarget.dataset.date;
    if (selectDayText === "EMPTY") {
      return;
    }
    this.selectComponent("#" + e.currentTarget.id).setSelect();
    if (this.data.lastSelected != null) {
      this.selectComponent("#" + this.data.lastSelected).unSelect();
    }
    this.doSetDetail(selectDayText);
    this.setData({
      lastSelected: e.currentTarget.id
    })
  },

  doSetDetail(selectDayText) {
    let workDay = newWorkTime(new Date(selectDayText));
    let detailFirstLine = "农历" + workDay.lunar.IMonthCn + workDay.lunar.IDayCn;
    detailFirstLine += "、" + workDay.weekDayText + "、" + workDay.workDay

    let detailSedLine = workDay.lunar.gzDay + "年" + workDay.lunar.gzMonth + "月" + workDay.lunar.gzDay + "日";
    detailFirstLine += "、" + workDay.lunar.astro;
    if (workDay.lunar.festival) {
      detailFirstLine += "、" + workDay.lunar.festival
    }
    if (workDay.lunar.lunarFestival) {
      detailFirstLine += "、" + workDay.lunar.lunarFestival
    }
    this.setData({
      detailFirstLine: detailFirstLine,
      detailSedLine: detailSedLine,
      showDetail: true
    })
  }
})