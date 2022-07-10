// index.js
// const app = getApp()
const { envList } = require('../../envList.js');
const { newWorkTime } = require('../../util/workTimeUtils.js');

let date = new Date();
let workDay = newWorkTime(date);

Page({
  data: {
    showUploadTip: false,
    bottomText: "生活不只眼前的苟且，还有诗何远方",
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
