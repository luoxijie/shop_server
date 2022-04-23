/*
 * @Description: 购物车模块数据持久层，数据层，
 * @Author: hai-27
 * @Date: 2020-02-07 16:51:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-10-21 10:31:44
 */
const db = require('./db.js');
module.exports={
    // 初始化购物车
    InitCar: async (iduser)=>{
        let uid=iduser;
        const sql='insert into car (uid) values(?)'
        return await db.query(sql,[uid]);
    },
    // 获取用户购物车
    GetCar: async (iduser)=>{
        let uid=iduser;
        const sql="select * from car where uid=?";
        return await db.query(sql,[uid]);
    },



    // 获取用户所有购物车详情信息
    GetAllCarDeatil: async (iduser)=>{
        let uid=iduser;
        const sql='select * from car c,car_deatil cd where c.idcar= cd.cid and c.uid=?'
        return await db.query(sql,[uid]);
    },
    // 获取指定的用户与商品的购物车详情信息
    GetCarDeatile: async (iduser,gid)=>{
        let uid=iduser;
        const sql='select * from car c,car_deatil cd where c.idcar= cd.cid and c.uid=? and cd.gid=?'
     return  await db.query(sql,[uid,gid])

    },


    // 向购物车详情表中新增数据（初始化）
    InitCarDetail: async (cid,gid,price)=>{
        const sql='insert into car_deatil (cid,gid,price) values(?,?,?)'
        return await db.query(sql,[cid,gid,price]);
    },
    // 向购物车详情表添加商品
    AddCarDetail: async (idcar_deatil)=>{
        const sql='update car_deatil set num=num+1 where idcar_deatil=?'
        return await db.query(sql,[idcar_deatil]);
    },
    // 购物车详情表中减少商品
    ReduceCarDetail: async(idcar_deatil)=>{
        const sql='update car_deatil set num=num-1 where idcar_deatil=?'
        console.log("减少被执行")
        return await db.query(sql,[idcar_deatil]);
    },
    // 删除购物车详情表的一个商品
    DelCarDetail :async (idcar_deatil)=>{
        console.log("删除被执行")
        const sql='delete from car_deatil where idcar_deatil=?'
        return await db.query(sql,[idcar_deatil]);
    },




}