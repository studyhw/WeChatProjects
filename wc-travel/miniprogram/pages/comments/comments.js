// var app = getApp()
const db = wx.cloud.database()
const comments = db.collection('comment')
Page({
    /*** 页面的初始数据 */
    data: {
        commentsList:'',
        userInfo:''
    },
    
    //加载数据
    onShow:function(params) {
        //获取登录信息
        var user = wx.getStorageSync('user2')
            this.setData({
                userInfo:user
        })
        //获取数据
        comments.get({
            success:res=>{
                // 将数据保存到页面的 data 中  
                this.setData({  
                    commentsList: res.data  
                })  
            }
        })
    },

    //添加评论
    goComment:function (params) {
        //验证是否登录
        if(this.data.userInfo){
            wx.navigateTo({
                url: '/pages/write/write',
            })
        }
        else{
            wx.showToast({
                icon: 'error',
                title: '请先登录或注册',
            })
        }
    },

    /*** 生命周期函数--监听页面加载*/
    onLoad(options) {
        //云开发初始化
        wx.cloud.init({
            env: 'cloud1-5gmvto6045079683',
        })
    },

   
})

    