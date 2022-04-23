/*
 * @Description: 商品模块控制器,业务逻辑层
 * @Author: hai-27
 * @Date: 2020-02-07 16:51:56
 * @LastEditors: hai-27
 * @LastEditTime: 2020-02-27 15:41:11
 */
const userDao=require('../dao/userDao');
const result=require('../../untils/responseData');
const check=require('../middleware/checkUserInfor');
const checkLogin=require('../middleware/checknLogin');
const jwt=require('jsonwebtoken')
module.exports={
     /**
   * 用户注册
   * @param {Object} ctx
   */
    Register:async ctx=>{
        let {user_name,password,address,phone}=ctx;
        let imgurl="";
        // 用户信息合法性校验
        console.log("收到的电话号码为",phone)
        if(check.checkUserInfo(user_name,password,address,phone).code!=0){
            return check.checkUserInfo(user_name,password,address,phone);
        }
        // 用户是否已注册校验
        let user= await userDao.GetUserByPhone(phone);
        if(user.length===1){
            return result.responseData(2,null)
        }else{
            // 新增数据
            return await result.responseData(0,userDao.Register(user_name,password,address,imgurl,phone))
        }
    },

     /**
   * 用户登录
   * @param {Object} ctx
   */
  Login:async ctx=>{
      let {user_name,password}=ctx;
       // 用户信息合法性校验
       if(check.checkUserNameAndPassword(user_name,password).code!=0){
        return check.checkUserNameAndPassword(user_name,password);
    }
    let user= await userDao.GetUserByNameAndPassword(user_name,password);
    if(user.length==1){

        let token=jwt.sign({
            //前端传递的用户名
            username:user_name
    
            // 'aaa'加密规则  解密时也按照这个规则
        },'aaa',{
            //过期时间 以秒为单位
            // expiresIn:60*10   //  过期时间   60秒
        })
        return result.responseData(0,{user,token});
    }
    else{
        return {code:7,msg:"密码或账号错误"};
    }
  },
   /**
   * 用户登录状态校验
   * @param {Object} ctx
   */
  test:async ctx=>{
      let{token}=ctx

      if (token===null){
          token=='0';
      }
    
      if(checkLogin.isLogin(token)){
          return {msg:'用户已经处于登录状态'}
      }
      else{
          return{msg:'用户未登录'}
      }
  },

   /**
   * 用户信息的修改
   * @param {Object} ctx
   */
  UpdateUser: async ctx=>{
    let {iduser,token}=ctx

    iduser=parseInt(iduser);

    if(!checkLogin.isLogin(token)){
        return {code:8,msg:'用户未登录请登录后操作'}
    }


        let user= await userDao.GetUserById(iduser);
        
        let tureUser=user[0];
        let {user_name,password,address,phone}={...tureUser,...ctx};
        // let user_name=(ctx.user_name!=''?ctx.user_name:tureUser.user_name);
        // let password=(ctx.password!=''?ctx.password:tureUser.password);
        // console.log("修改后的秘吗为",user_name);
        // let address=(ctx.address!=''?ctx.address:tureUser.address);
        // let phone=(ctx.phone!=''?ctx.phone:tureUser.phone);
        // console.log("用户名",ctx.password);
      

    let imgurl="";
    // 用户信息合法性校验
    if(check.checkUserInfo(user_name,password,address,phone).code!=0){
        return check.checkUserInfo(user_name,password,address,phone);
    }else{
        // 新增数据
        return await result.responseData(0,userDao.UpdateUserById(user_name,password,address,phone,iduser))
    }
    
  }


  

    
}