const db = wx.cloud.database()
const video = db.collection('foodImg')
//获取应用实例
var app = getApp()
Page({
  data: {
    foods:'',
  },
  //事件处理函数
  bindViewTap: function(e) {
    console.log(e.currentTarget.id)
    var itemId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detailms/detailms?new_id='+itemId
    })
  },
 
  //加载数据
  onShow:function(params) {
    video.get({
        success:res=>{
            // 将数据保存到页面的 data 中  
            this.setData({  
              foods: res.data
       })
    }
  })
},
})
