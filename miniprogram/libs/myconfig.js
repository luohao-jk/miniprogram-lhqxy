let myConfig = {
  "tipTexts": [
  ],
  "festival": {
    '1-1': {title: '元旦节'},
    '2-14': {title: '情人节'},
    '4-21': {title: '纪念日'},
    '5-1': {title: '劳动节'},
    '5-4': {title: '青年节'},
    '6-1': {title: '儿童节'},
    '9-10': {title: '教师节'},
    '10-1': {title: '国庆节'},
    '12-25': {title: '圣诞节'},
    '3-8': {title: '妇女节'},
    '3-12': {title: '植树节'},
    '4-1': {title: '愚人节'},
    '5-12': {title: '护士节'},
    '7-1': {title: '建党节'},
    '8-1': {title: '建军节'},
    '12-24': {title: '平安夜'},
  },
  "lFestival": {
    "12-30": {"title": "除夕"},
    "1-1": {"title": "春节"},
    "1-15": {"title": "元宵节"},
    "1-29": {"title": "胖胖生日"},
    "2-2": {"title": "龙抬头"},
    "5-5": {"title": "端午节"},
    "7-7": {"title": "七夕节"},
    "8-15": {"title": "中秋节"},
    "8-21": {"title": "老婆生日"},
    "9-9": {"title": "重阳节"},
    "10-1": {"title": "寒衣节"},
    "10-15": {"title": "下元节"},
    "12-8": {"title": "腊八节"},
    "12-23": {"title": "北方小年"},
    "12-24": {"title": "南方小年"}
  },
  "startWorkFlow": "2010-01-03",
  "autoJumpCalendar": true,
  "loadMonthPreTime": 2,
  "reloadTime": 2,
  "randomTipTime": 2
};

let resolve;
let reject;
let loadPromise = new Promise((resolve0, reject0) => {
  resolve = resolve0;
  reject = reject0;
});

function reload() {
  wx.request({
    url: 'https://static-1251011743.cos.ap-shanghai.myqcloud.com/config.json?t=' + Date.now(),
    timeout: 2000,
    success(result) {
      myConfig.tipTexts = result.data.tipTexts;
      myConfig.festival = result.data.festival;
      myConfig.lFestival = result.data.lFestival;
      myConfig.startWorkFlow = result.data.startWorkFlow;
      myConfig.autoJumpCalendar = result.data.autoJumpCalendar;
      myConfig.loadMonthPreTime = result.data.loadMonthPreTime || myConfig.loadMonthPreTime;
      myConfig.reloadTime = result.data.reloadTime || myConfig.reloadTime;
      myConfig.randomTipTime = result.data.randomTipTime || myConfig.randomTipTime;
      setTimeout(reload, myConfig.reloadTime * 1000)
      resolve(1);
    },
    fail(e) {
      reject(e);
    }
  });
}

reload();

module.exports = {
  myConfig: myConfig,
  loadPrimose: loadPromise
}