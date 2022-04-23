/*
 * @Description: 校验用户登录状态
 * @Author: hai-27
 * @Date: 2020-02-25 15:43:27
 * @LastEditors: hai-27
 * @LastEditTime: 2020-02-27 02:04:35
 */
//引入  jsonwebtoken模块
const jwt=require('jsonwebtoken');
module.exports={
    isLogin:(token)=>{
        let flag=false;
        jwt.verify(token,'aaa',(err,decode)=>{
            console.log('err',err)  //null 表示没有报错
            console.log('decode',decode)
            if(!err){
                // 没有报错  数据返回给前端
               flag=true
            }else{
                //报错  说明登录失败
              flag=false
            }
        })
        return flag;

    }
}