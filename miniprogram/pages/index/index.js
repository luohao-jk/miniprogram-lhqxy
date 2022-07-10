// index.js
// const app = getApp()
const { envList } = require('../../envList.js');
const {tipTexts} = require('../../libs/tipText.js');
const { newWorkTime } = require('../../util/workTimeUtils.js');

let date = new Date();
let workDay = newWorkTime(date);

Page({
  data: {
    showUploadTip: false,
    bottomText: "回忆永远是惆怅的。愉快的使人觉得:可惜已经完了,不愉快的想起来还是伤心",
    powerList: [{
      title: '工作时间',
      tip: workDay.workDayText,
      showItem: false
    }],
    envList,
    selectedEnv: envList[0],
    haveCreateCollection: false
  },
  onReady() {
    this.setData({
      bottomText: tipTexts[Math.floor(Math.random() * tipTexts.length)]
    });
    setInterval(() => {
      this.setData({
        bottomText: tipTexts[Math.floor(Math.random() * tipTexts.length)]
      });
    }, 10000);
  },

  jumpPage(e) {
    wx.navigateTo({
      url: `/pages/work-calendar/work-calendar?envId=${this.data.selectedEnv.envId}`,
    });
  },

  onClickDatabase(powerList) {
    wx.showLoading({
      title: '',
    });
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.selectedEnv.envId
      },
      data: {
        type: 'createCollection'
      }
    }).then((resp) => {
      if (resp.result.success) {
        this.setData({
          haveCreateCollection: true
        });
      }
      this.setData({
        powerList
      });
      wx.hideLoading();
    }).catch((e) => {
      console.log(e);
      this.setData({
        showUploadTip: true
      });
      wx.hideLoading();
    });
  }
});
