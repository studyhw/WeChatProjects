const db = wx.cloud.database();
const dbComment = db.collection("comment")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {
            nickName:'xxx',
            avatarUrl:'asd'
        },
        currentDate:'',
        imgurl:'',
        text:''
    },


    /** * 生命周期函数--加载数据 */
    onLoad(options) {
        // 获取当前时间  
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

    
    //获取用户数据
    onShow() {
        var user = wx.getStorageSync('user2')
            this.setData({
                userInfo:user
        })
    }, 


    //增加评论
    addComments(e){
        let comment = e.detail.value
        if (!comment.text) {
            wx.showToast({
                icon: 'error',
                title: '请填写评论',
            })
        }else {
            this.addUser(comment)
        }
    },

     //添加用户
     addUser(comment) {
        comment.content = comment.text
        comment.nickname = this.data.userInfo.name
        comment.imgurl = this.data.imgurl
        comment.time = this.data.currentDate
        comment.userimg = this.data.userInfo.avatarUrl
        //测试
        console.log("头像",comment.userimg);
        dbComment.add({
            data: comment
        }).then(res => {
            console.log('评论成功', res)
            wx.showToast({
                title: '评论成功！',
                icon: 'success',
                duration: 1500
            })
            setTimeout(function () {
               // wx.navigateBack();
            }, 1000)
        })
    }

})