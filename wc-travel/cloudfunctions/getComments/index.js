// 云函数入口文件  
const cloud = require('wx-server-sdk')  
  
cloud.init()  
  
// 云函数入口函数  
exports.main = async (event, context) => {  
  try {  
    const db = cloud.database()  
    const collection = db.collection('comment')
    const res = await collection.get()  
    return res.data  
  } catch (err) {  
    console.error(err)  
    return err  
  }  
}