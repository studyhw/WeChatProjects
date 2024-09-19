const db = wx.cloud.database()
const swiper = db.collection('lun_bo')
Page({
  data: {
    swiperImg:''
  },

  // 页面跳转
  navigateToSpot: function(e) {
    var itemId = e.currentTarget.dataset.id;
    if(itemId=='1'){
      wx.navigateTo({
        url: '/pages/spot1/spot1'
      });
    }else if(itemId=='2'){
      wx.navigateTo({
        url: '/pages/spot2/spot2'
      });
    }else if(itemId=='3'){
      wx.navigateTo({
        url: '/pages/spot3/spot3'
      });
    }else{
      wx.navigateTo({
        url: '/pages/spot4/spot4'
      });
    }
    
  },

  //加载数据
  onShow:function(params) {
    swiper.get({
        success:res=>{
            // 将数据保存到页面的 data 中  
            this.setData({  
              swiperImg: res.data  
            })  
        }
    })
},
});
