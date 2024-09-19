const db = wx.cloud.database()
const swiper = db.collection('gou_piao')

Page({
  data: {
    byImg:'',
    tickets: [
      {
        name: "学生票",
        price: 0,
        openingHours: "（9:00 - 18:00）",
      },
      {
        name: "成人票",
        price: 70,
        openingHours: "（9:00 - 18:00）",
      },
      {
        name: "儿童老人票",
        price: 10,
        openingHours: "（9:00 - 18:00）",
      },
    ]
  },

  onLoad: function() {
    // 将 tickets 数据按列排列
    const columns = this.arrangeTicketsInColumns(this.data.tickets, 2); // 假设每列显示两个门票
    this.setData({ columns: columns });
  },

  arrangeTicketsInColumns: function(tickets, columnCount) {
    const columns = [];
    for (let i = 0; i < tickets.length; i += columnCount) {
      columns.push(tickets.slice(i, i + columnCount));
    }
    return columns;
  },

    // 购买门票
  buyTicket: function() {
    wx.showToast({
      title: '购买成功！',
      icon: 'success',
      duration: 2000
    })
  },

    //加载数据
    onShow:function(params) {
      swiper.where({name:'购票'}).get({
          success:res=>{
              // 将数据保存到页面的 data 中  
              this.setData({  
                byImg: res.data  
              })  
          }
      })
  },
})
