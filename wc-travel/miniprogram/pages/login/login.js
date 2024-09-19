const db = wx.cloud.database()
Page({
    // 登陆功能
    create_login(e) {
        let user = e.detail.value
        console.log('user', user)
        if (!user.phone) {
            wx.showToast({
                icon: 'none',
                title: '请填写手机',
            })
        } else if (!user.password) {
            wx.showToast({
                icon: 'none',
                title: '请填写密码',
            })
        } else {
            db.collection('user').where({
                    phone: user.phone,
                    password: user.password
                }).get()
                .then(res => {
                    console.log('获取登录结果', res)
                    let users = res.data
                    if (users && users.length > 0) {
                        let user = users[0]
                        //暂存变量
                        wx.setStorageSync('user2', user)
                        wx.navigateTo({
                            url: '/pages/home/home',
                        })
                    } else {
                        wx.showToast({
                            title: '账号密码错误',
                            icon: "error"
                        })
                    }
                })
                .catch(res => {
                    console.log('获取登录结果失败', res)
                })
        }
    },
    // 去注册
    zhuce(res) {
        wx.navigateTo({
            url: '/pages/register/register',
        })
    },
})