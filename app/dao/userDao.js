/*
 * @Description: 用户模块数据持久层，数据层，
 * @Author: hai-27
 * @Date: 2020-02-07 16:51:56
 * @LastEditors: hai-27
 * @LastEditTime: 2020-02-27 15:42:52
 */
// const { UpdateUser } = require('../controllers/userControllers.js');
const db = require('./db.js');
module.exports={
    // 连接数据库，插入用户信息
    Register: async (user_name,password,address,imgurl,phone)=>{
        const sql="insert into user(user_name,password,token,address,imgurl,phone) values(?,?,?,?,?,?)"
        return await db.query(sql,[user_name,password,null,address,imgurl,phone])
    },
    // 连接数据库,根据id，获取用户信息
    GetUserById: async(iduser)=>{
        const sql='select * from user where iduser=?'
        return await db.query(sql,[iduser])
    },
    //连接数据库，根据phone,获取用户信息
    GetUserByPhone: async(phone)=>{
        const sql='select * from user where phone=?'
        return await db.query(sql,[phone])
    },
    // 连接数据库,根据用户名和密码,获取用户信息
    GetUserByNameAndPassword: async(user_name,password)=>{
        const sql='select * from user where user_name=? and password=?'
        return await db.query(sql,[user_name,password])
    },
    // 连接数据库，根据iduser修改用户信息,
    UpdateUserById: async(user_name,password,address,phone,iduser)=>{
        const sql='update user set user.user_name=?,user.password=?,user.address=?,user.phone=? where iduser=?'
        return await db.query(sql,[user_name,password,address,phone,iduser]);
    }

    // 清空用户的购物车


}
