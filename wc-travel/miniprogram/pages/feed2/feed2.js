// pages/feed2/feed2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    feedbackContent: '', // 反馈内容  
    feedbackList: [], // 反馈列表，这里模拟为数组  
    toView: ''

  },
  bindInput: function(e) {  
    this.setData({  
      feedbackContent: e.detail.value  
    });  
  },  
  submitFeedback: function() {  
    if (!this.data.feedbackContent) {  
      wx.showToast({  
        title: '请输入反馈内容',  
        icon: 'none'  
      });  
      return;  
    }  
    // 将反馈内容添加到列表的开头（模拟新提交的在最上方）  
    const newFeedbackList = [this.data.feedbackContent, ...this.data.feedbackList];  
    // 限制列表长度（可选，避免列表过长）  
    if (newFeedbackList.length > 10) {  
      newFeedbackList.pop();  
    }  
    this.setData({  
      feedbackContent: '', // 清空输入框  
      feedbackList: newFeedbackList, // 更新反馈列表  
      toView: 'feedback-' + newFeedbackList.length // 滚动到最新一条反馈（模拟ID）  
    });  
  },  
  gotofirst:function(){
    wx.navigateTo({
      url: '../index/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})