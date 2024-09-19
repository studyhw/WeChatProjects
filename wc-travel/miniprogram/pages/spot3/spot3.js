const db = wx.cloud.database()
const photo = db.collection('juti')
const photos = db.collection('juti2')
Page({
  data: {
    first_photo:'',
    photos:'',
  },


  //加载数据
  onShow:function(params) {
    //上方简介
    photo.where({name:'将军山'}).get({
        success:res=>{
            // 将数据保存到页面的 data 中  
            this.setData({  
              first_photo: res.data  
            })  
        }
    })
    //下方图片
    photos.where({name:'将军山'}).get({
      success:res=>{
          // 将数据保存到页面的 data 中  
          this.setData({  
            photos: res.data  
          })  
      }
  })
},

  //返回
  goBack: function() {
    wx.navigateBack();
  }
 });
