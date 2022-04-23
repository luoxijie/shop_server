/*
 * @Description: 校验用户信息是否符合规则
 * @Author: hai-27
 * @Date: 2020-02-25 15:43:27
 * @LastEditors: hai-27
 * @LastEditTime: 2020-02-27 02:04:35
 */
module.exports = {
    /**
     * 校验用户信息是否符合规则
     * @param {Object} ctx
     * @param {string} userName
     * @param {string} password
     * @return: 
     */
    checkUserInfo: (user_name,password,address,phone) => {
      // userName = userName ? userName : '';
      // password = password ? password : '';
      // 判断是否为空
      if (user_name === null || password === null||address===null||phone===null) {
        ctx.body = {
          code: '002',
          msg: '信息不能为空'
        }
        return false;
      }
      // 用户名校验规则
      const userNameRule = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
      if (!userNameRule.test(user_name)) {
        return {
            code: 3,
            msg: '用户名不合法(以字母开头，允许5-16字节，允许字母数字下划线)'
          };
      }
      // 密码校验规则
      const passwordRule = /^[a-zA-Z]\w{5,17}$/;
      if (!passwordRule.test(password)) {
        return  {
            code: 4,
            msg: '密码不合法(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)'
          };
      }
    // //   地址校验规则
    // const addressRule=/([\u4e00-\u9fa5])(^-?[1-9])/;
    // if(!addressRule.test(address)){
  
    //   return  {
    //     code: 5,
    //     msg: '地址不合法(只能够是中文字符)'
    //   };
    //   }
    // 电话校验规则
    const phoneRule= /0?(13|14|15|17|18|19)[0-9]{9}/
    if(!phoneRule.test(phone)){
        return{
            code:6,
            msg:"电话号码不符合规则"
        }
    }
    
    return {
        code:0,
        msg:''
    }
    },

    checkUserNameAndPassword:(user_name,password)=>{

         // 判断是否为空
      if (user_name === null || password === null) {
        ctx.body = {
          code: '002',
          msg: '信息不能为空'
        }
        return false;
      }


          // 用户名校验规则
      const userNameRule = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
      if (!userNameRule.test(user_name)) {
        return {
            code: 3,
            msg: '用户名不合法(以字母开头，允许5-16字节，允许字母数字下划线)'
          };
      }
      // 密码校验规则
      const passwordRule = /^[a-zA-Z]\w{5,17}$/;
      if (!passwordRule.test(password)) {
        return  {
            code: 4,
            msg: '密码不合法(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)'
          };
      }

      return {
        code:0,
        msg:''
    }

    }
   
  }