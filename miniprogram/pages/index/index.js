// index.js
// const app = getApp()
const { envList } = require('../../envList.js');
const { loadPrimose, myConfig } = require('../../libs/myconfig.js');
const { newWorkTime } = require('../../util/workTimeUtils.js');

let date = new Date();
let workDay = newWorkTime(date);

Page({
  data: {
    showUploadTip: false,
    bottomText: "",
    powerList: [{
      title: '工作时间',
      tip: workDay.workDayText,
      showItem: false,
      href: "/pages/work-calendar/work-calendar"
    }],
    envList,
    selectedEnv: envList[0],
    haveCreateCollection: false
  },
  onReady() {
    loadPrimose.then(() => {
      this.init();
    }).catch(e => {
      this.init();
    })
  },

  init() {
    this.randomTipTextInterval();
    if (myConfig.autoJumpCalendar) {
      wx.navigateTo({
        url: `${this.data.powerList[0].href}?envId=${this.data.selectedEnv.envId}`,
      });
    }
  },

  randomTipTextInterval() {
    this.randomTipText();
    setTimeout(this.randomTipTextInterval, myConfig.randomTipTime * 1000)
  },

  randomTipText() {
    if (myConfig.tipTexts.length === 0) {
      return;
    }
    this.setData({
      bottomText: myConfig.tipTexts[Math.floor(Math.random() * myConfig.tipTexts.length)]
    });
  },

  jumpPage(e) {
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: `${this.data.powerList[index].href}?envId=${this.data.selectedEnv.envId}`,
    });
  }
});
