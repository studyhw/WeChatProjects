
const db = wx.cloud.database();
const dbUser = db.collection("user")
Page({
    data:{
        avatarUrl:"/images/no_login.png"
    },
    // 注册
    reg(e) {
        let user = e.detail.value
        console.log('user', user)
        if (!user.phone) {
            wx.showToast({
                icon: 'error',
                title: '请填写手机',
            })
        } else if (!user.password) {
            wx.showToast({
                icon: 'error',
                title: '请填写密码',
            })
        } else if (!user.name) {
            wx.showToast({
                icon: 'error',
                title: '请填写姓名',
            })
        } else {
            dbUser.doc(user.phone).get()
                .then(res => {
                    console.log('查询结果', res)
                    if (res.data) {
                        wx.showToast({
                            icon: 'error',
                            title: '手机号已注册过',
                            duration: 1500
                        })
                    } else {
                        this.addUser(user)
                    }
                }).catch(res => {
                    console.log('没有注册过')
                    this.addUser(user)
                })
        }
    },
     //新版选择图片
     choose_image() {
        wx.chooseMedia({
            count: 1,
            mediaType: ['image'],
            sizeType: ['compressed'], //可以指定是原图还是压缩图，这里用压缩
            sourceType: ['album', 'camera'], //从相册选择
            success: (res) => {
                console.log("选择图片成功", res)
                this.setData({
                    avatarUrl: res.tempFiles[0].tempFilePath
                })
            }
        })
    },
    //添加用户
    addUser(user) {
        user._id = user.phone
        // 获取用户头像
        user.avatarUrl = this.data.avatarUrl
        console.log(user.avatarUrl);
        dbUser.add({
            data: user
        }).then(res => {
            console.log('注册成功', res)
            wx.showToast({
                title: '注册成功！',
                icon: 'success',
                duration: 2500
            })
            setTimeout(function () {
                wx.navigateTo({
                    url: '/pages/login/login',
                })
            }, 1000)
        })
    }
})