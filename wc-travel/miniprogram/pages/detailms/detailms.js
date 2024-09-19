var util=require("../../utils/util.js")
var app = getApp()
const db = wx.cloud.database()
const fv = db.collection("foodViedo")
const fw = db.collection("foodContents")
Page({
  data: {
    now_id:"1",
    contentList:'',
    currentDate:'',
    userInfo:'',
    comment:'',
    videoInfo2:'',
    commentContent:'',
  },


//加载跳转数据，时间
onLoad: function (options) {
  //获取跳转的id值
    this.setData({
    now_id:options.new_id
  })
  //获取当前时间
  
  var now = new Date();  
  var year = now.getFullYear();  
  var month = now.getMonth()+1;  
  var date = now.getDate();  
  // 格式化日期  

  // 如果月份或日期小于10，则在前面补0  
  month = month < 10 ? '0' + month : month;  
  date = date < 10 ? '0' + date : date;  

  var formattedDate = year + '-' + month + '-' + date;  

  // 将日期设置为页面的数据  
  this.setData({  
  currentDate: formattedDate  
  });  
},

//加载评论，视频，简介数据
onShow:function(params) {
    //获取登录信息
    var user = wx.getStorageSync('user2')
      this.setData({
          userInfo:user
      })
    //获取视频和简介
    fv.where({id:this.data.now_id}).get({
        success:res=>{
            // 将数据保存到页面的 data 中  
            this.setData({  
              videoInfo2: res.data
        })
      }
    })
    //获取评论
    db.collection("foodContents").get({
      success:res1=>{
        //将数据保存到contentList中
        this.setData({
          contentList:res1.data
        })
      }
    })
},


//获取输入框内容
bindInput:function(e){
  var that=this;
  var value= e.detail.value;
  console.log(value);
  that.setData({
    commentContent:value
  })
  console.log(this.data.commentContent);
},

//验证是否登录
goComment:function (params) {
  if(this.data.userInfo){
     this.addComments(this.data.commentContent)
  }
  else{
      wx.showToast({
          icon: 'error',
          title: '请先登录或注册',
      })
  }
},

//增加评论
addComments:function(commentContent){
  if (!commentContent) {
      wx.showToast({
          icon: 'error',
          title: '请填写评论',
      })
  }
  else {
    //获取用户信息和时间
    let userInfo = this.data.userInfo;  
    let currentDate = this.data.currentDate; 
    //评论内容
    let comment = {  
      content: commentContent, // 直接使用commentContent  
      name: userInfo.name,  
      time: currentDate,  
      avatarurl: userInfo.avatarUrl, // 注意是avatarUrl而不是userimg  
    };  
      // 添加评论到数据库  
      fw.add({  
        data: comment  
      }).then(res => {  
        console.log('评论成功', res);  
        wx.showToast({  
          title: '评论成功！',  
          icon: 'success',  
          duration: 1500  
        });  

      }).catch(err => {  
        console.error('评论失败', err);  
      });  
    }  
  },  

})