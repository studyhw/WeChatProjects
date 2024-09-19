// pages/index/index.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图
    lunboList:[
      {
        img:"https://tse4-mm.cn.bing.net/th/id/OIP-C.Pqb1tJQsHP6JL0yVaeK8TwHaE8?rs=1&pid=ImgDetMain"
      },{
        img:"https://tse1-mm.cn.bing.net/th/id/OIP-C.IYrOYNdeBCNHusvVRupTvgHaE0?w=255&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"
      },{
        img:"https://tse2-mm.cn.bing.net/th/id/OIP-C.hlCDfvp2HCwEyJ9mDGDcKgAAAA?w=257&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"
      },{
          img:"https://tse2-mm.cn.bing.net/th/id/OIP-C.8g01E8r614XV5ED3RHjCxAHaE8?w=261&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"
        }
    ],
    // 天气
    region:['广东省','肇庆市','鼎湖区'],
    now:{
      temp:0,
      text:'未知',
      icon:'999',
      humidity:0,
      pressure:0,
      vis:0,
      windDir:0,
      windSpeed:0,
      windScale:0
    }
  },
// 跳转到交通
gotoTraffic:function(){
wx.navigateTo({
  url: '../map/map', 
})
},
// 跳转到美食
gotoFood:function(){
  wx.navigateTo({
  url: '../indexms/indexms', 
  })
  },
// 跳转到景点
gotoSights:function(){
  wx.navigateTo({
    url: '../index2/index2', 
  })
  },
// 跳转到建议
gotoSuggest:function(){
  wx.navigateTo({
    url: '../feed2/feed2',
  })
  },

regionChange:function(e){
this.setData({ region:e.detail.value});
this.getWeather();
},
getWeather:function(){
  var that=this;
  var location_name=util.getLocationID(that.data.region[1])
    wx.request({
      url: 'https://devapi.heweather.net/v7/weather/now',
      data:{
        location:location_name,
        key:'61130796b68b4ac6bedf213c448eb9a2'
      },
      success:function(res){
        console.log(res)
        that.setData({now:res.data.now});
      }
    })
},

  onLoad:function(options){
    this.getWeather();  //更新天气
  }
})