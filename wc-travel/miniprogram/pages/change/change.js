const db = wx.cloud.database()
Page({
    onLoad() {
        var user = wx.getStorageSync('user2')
        console.log('user', user)
        console.log('user.name', user.name)
        if (user && user.name) {
            this.setData({
                user: user,
                name: user.name,
                avatarUrl: user.avatarUrl
            })
        }
    },
    getName(e) {
        this.setData({
            name: e.detail.value
        })
    },
    //新版选择图片
    chooseImage() {
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
    //上传数据
    submit(e) {
        let user = this.data.user
        let filePath = this.data.avatarUrl
        let name = this.data.name
        if (filePath == user.avatarUrl && name == user.name) {
            console.log('头像姓名都没有改变')
        } else if (filePath == user.avatarUrl && name != user.name) {
            console.log('只改变姓名')
            db.collection('user').doc(user._id).update({
                data: {
                    name: name
                }
            }).then(res => {
                console.log('修改姓名的结果', res)
                user.name = name
                wx.setStorageSync('user2', user)
                wx.showToast({
                    title: '修改成功',
                })
            })
        } else {
            let suffix = /\.[^\.]+$/.exec(filePath)[0]; // 正则表达式，获取文件扩展名
            wx.cloud.uploadFile({
                cloudPath: new Date().getTime() + suffix,
                filePath: filePath, // 文件路径
            }).then(res => {
                // get resource ID
                let fileID = res.fileID
                console.log("上传结果", fileID)
                db.collection('user').doc(user._id).update({
                    data: {
                        name: name,
                        avatarUrl: fileID
                    }
                }).then(res => {
                    console.log('修改姓名和头像的结果', res)
                    user.name = name
                    user.avatarUrl = fileID
                    wx.setStorageSync('user2', user)
                    wx.showToast({
                        title: '修改成功',
                    })
                })
            }).catch(error => {
                console.log("上传失败", error)
            })
        }
    },
})