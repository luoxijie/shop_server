/*
 * @Description: 购物车模块控制器,业务逻辑层
 * @Author: hai-27
 * @Date: 2020-02-07 16:51:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-10-21 10:37:38
 */
const carDao=require('../dao/carDao');
const result=require('../../untils/responseData');
const checkLogin=require('../middleware/checknLogin');
const goodsDao=require('../dao/goodsDao');
module.exports={
  /**
   * 根据商品uid,获取购物车详细信息
   * @param {Object} ctx
   */
    GetCarDetail: async(ctx)=>{
        // 登录校验
        let {iduser,token}=ctx
        iduser=parseInt(iduser); 
        if(!checkLogin.isLogin(token)){
            return {code:8,msg:'用户未登录请登录后操作'}
        }
        // 购物车是否初始化校验
        let car=await carDao.GetCar(iduser);
        if(car.length===0){
            console.log("初始化购物车，uid为"+iduser);
            await carDao.InitCar(iduser);
        }
        // 获取购物车详细信息
        let car_deatil= await carDao.GetAllCarDeatil(iduser);
        if(car_deatil.length===0){
            // 购物车详情为空返回错误提示信息
            return result.responseData(-1,{});
        }
  
// 提取商品详细信息
            for(var i=0;i<car_deatil.length;i++){
                let good=await goodsDao.GetGoodsById(car_deatil[i].gid);

                car_deatil[i].good=good;
            }          
        return result.responseData(0,car_deatil);
    },

     /**
   * 根据商品gid,token,uid,增加购物车中的商品
   * @param {Object} ctx
   */
  AddCarDetail:async(ctx)=>{
       // 登录校验
       let {iduser,token,gid}=ctx
       iduser=parseInt(iduser); 
       if(!checkLogin.isLogin(token)){
           return {code:8,msg:'用户未登录请登录后操作'}
       }
       // 购物车是否初始化校验
        let car=await carDao.GetCar(iduser);
        if(car.length===0){
                   console.log("初始化购物车，uid为"+iduser);
                   await carDao.InitCar(iduser);
        }
    //    购物车详情校验
    let idcar_deatil=-1;
    let car_deatil= await carDao.GetCarDeatile(iduser,gid)
    if(car_deatil.length===0){
        console.log("初始化购物车详情");
        // 获取商品价格
        let good=await goodsDao.GetGoodsById(gid);
        console.log("商品",good[0].price);
        let {price}=good[0];
        // 获取购物车编号
        let car=await carDao.GetCar(iduser);
        let {idcar}=car[0];


        await carDao.InitCarDetail(idcar,gid,price);

        // 初始化完成后，进行自增数量

        let car_deatil_true=await carDao.GetCarDeatile(iduser,gid)
        idcar_deatil=car_deatil_true[0].idcar_deatil;

        await carDao.AddCarDetail(idcar_deatil);
        return result.responseData(0,{});
    }
    else{
        // 购物车详情中已经存在目标数据，直接自增。
    idcar_deatil=car_deatil[0].idcar_deatil;
    let res=await carDao.AddCarDetail(idcar_deatil);

    return result.responseData(0,{});
    }


  },
  /**
   * 根据商品gid,token,uid,减少购物车中的商品
   * @param {Object} ctx
   */
  ReducueCarDetail :async(ctx)=>{
         // 登录校验
         let {iduser,token,gid}=ctx
         iduser=parseInt(iduser); 
         if(!checkLogin.isLogin(token)){
             return {code:8,msg:'用户未登录请登录后操作'}
         }
      //    购物车详情校验
      let idcar_deatil=-1;
      let car_deatil= await carDao.GetCarDeatile(iduser,gid);
      if(car_deatil.length===1&&car_deatil[0].num===1){
        //   当购物车详情表中的删除前某个商品数目，为1时，对其进行删除整行数据的操作
        // 避免对前端数据显示的干扰
          console.log("删除购物车详情");
          let car_deatil_true=await carDao.GetCarDeatile(iduser,gid)
          idcar_deatil=car_deatil_true[0].idcar_deatil;

          await carDao.DelCarDetail(idcar_deatil);

          return result.responseData(0,{});
      }
      else{
        //   非清空，数目减少操作。
      idcar_deatil=car_deatil[0].idcar_deatil;
      let res=await carDao.ReduceCarDetail(idcar_deatil);
  
      return result.responseData(0,{});
      }
  },
    /**
   * 根据商品gid,token,uid,删除购物车中的商品
   * @param {Object} ctx
   */
  DelCarDetail: async(ctx)=>{
      console.log("进入了删除控制组件")
       // 登录校验
       let {iduser,token,gid}=ctx
       iduser=parseInt(iduser); 
       if(!checkLogin.isLogin(token)){
           return {code:8,msg:'用户未登录请登录后操作'}
       }
             //    购物车详情校验
      let idcar_deatil=-1;
      let car_deatil= await carDao.GetCarDeatile(iduser,gid);
      if(car_deatil.length===0){
          return result.responseData(-1,{});
      }
      idcar_deatil=car_deatil[0].idcar_deatil;
      await carDao.DelCarDetail(idcar_deatil);

      return result.responseData(0,{});
  }


}