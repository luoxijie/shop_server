/*
 * @Description: 订单模块数据持久层，数据层，
 * @Author: hai-27
 * @Date: 2020-02-07 16:51:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-08 14:57:47
 */
const db = require('./db.js');

module.exports={
    // 增加订单
    AddOrder: async(uid,pldate,toprice,order_address)=>{
        const sql='insert into myorder (uid,pldate,toprice,order_address) values(?,?,?,?)';
        return await db.query(sql,[uid,pldate,toprice,order_address]);
    },
    // 增加订单详情
    AdddOrderDetail: async(gid,oid,num,price)=>{
        const sql='insert into order_detail (gid,oid,num,price) values(?,?,?,?)';
        return await db.query(sql,[gid,oid,num,price]);
    },
    // 获取订单
    GetOrders: async(uid)=>{
        const sql='select * from myorder where uid=?'
        return await db.query(sql,[uid]);
    },
    // 按类型获取订单
    GetOrdersByType: async(uid,type)=>{
        const sql='select * from myorder where uid=? and type=?'
        return await db.query(sql,[uid,type]);
    },
    // 按时间获取订单
    GetOrderBytime: async(uid,pldate)=>{
        const sql='select * from myorder where uid=? and pldate=?'
        return await db.query(sql,[uid,pldate]);
    },
    // 获取订单详情
    GetOrderDetails: async(oid)=>{
        const sql="select *from order_detail where oid=?"
        return await db.query(sql,[oid]);
    },
    // 修改订单的状态
    UudateOder: async(idorder)=>{
        const sql="update myorder set type ='已支付' where idorder= ?"
        return await db.query(sql,[idorder]);
    },
    // 修改订单的配送地址
    UpdateOrderAddress:async(order_address,idorder)=>{
        console.log("address",order_address);
        console.log("id",idorder);

        const sql="update myorder set order_address = ? where idorder= ?"
        return await db.query(sql,[order_address,idorder]);

    },
    // 按idorder获取单个订单
    GetOrderById: async(idorder)=>{
        const sql="select * from myorder o,order_detail od where o.idorder= od.oid and o.idorder=?"
        return await db.query(sql,[idorder]);
    },
    // 分页获取所有订单
    GetOrdersBylimit:async(uid,page,limit)=>{
    let start=(page-1)*limit;
    let num=limit;
    const sql='select * from myorder where uid=? limit '+start+','+num;
    return await db.query(sql,[uid]);
    },
    // 分页获取指定类型的订单
    GetOrdersByTypeAndLimit:async(uid,type,page,limit)=>{
        let start=(page-1)*limit;
        let num=limit;
        const sql='select * from myorder where uid=? and type=? limit '+start+','+num;
        return await db.query(sql,[uid,type]);

    }
    
}