/*
 * @Description: 商品模块数据持久层，数据层，负责获取数据
 * @Author: hai-27
 * @Date: 2020-02-07 16:51:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-10-16 15:55:10
 */
// const { search } = require('../routers/goodsRouter.js');
const db = require('./db.js');

module.exports = {
  // 连接数据库获取商品分类
  GetGoods: async () => {
    const sql = "select * from goods";
    return await db.query(sql, []);
  },
  // 根据id获取单个商品
  GetGoodsById: async(id)=>{
    const sql='SELECT * FROM shop_city.goods where id=?;';
    return await db.query(sql,[id]);
  },
  // 分页获取商品
  GetGoodsByLimit: async(page,limit)=>{
    let start=(page-1)*limit;
    let num=limit;
    const sql='select * from goods limit '+start+','+num;
    return await db.query(sql,[])
  },
  // 按类型分页获取商品
  GetGoodsBytype: async(type,page,limit)=>{
    let start=(page-1)*limit;
    let num=limit;
    const sql='SELECT * FROM shop_city.goods where type=? limit '+start+','+num;
    return await db.query(sql,[type]);

  },
  // 模糊查询商品信息，并分页
  GetGoodsBySearch: async(search,page,limit)=>{
    let start=(page-1)*limit;
    let num=limit; 
    const sql=`select * from goods where name like '%${search}%' or brand like '%${search}%' or myexplain like '%${search}%' or type like '%${search}%' limit ${start},${num}`;
   
    return await db.query(sql,[]);


  }
 
}
