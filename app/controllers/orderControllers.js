/*
 * @Description: 商品模块控制器,业务逻辑层
 * @Author: hai-27
 * @Date: 2020-02-07 16:51:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-08 12:55:07
 */
const orderDao=require('../dao/orderDao');
const carDao=require('../dao/carDao');
const goodDao=require('../dao/goodsDao');
const userDao=require("../dao/userDao");
const result=require('../../untils/responseData');
const checkLogin=require('../middleware/checknLogin');
const time=require('../middleware/time');
const { type } = require('express/lib/response');

module.exports={
       /**
   * 订单生成并清空购物车
   * @param {Object} ctx
   */
    MakeOrder:async(ctx)=>{
        console.log("开始生成订单Con");
        let {iduser,token}=ctx;
        let uid=iduser;
        let toprice=0;
        //  // 登录校验
        //  iduser=parseInt(uid); 
        //  if(!checkLogin.isLogin(token)){
        //     console.log("用户未登录");
        //      return {code:8,msg:'用户未登录请登录后操作'}
        //  }
        //  获取购物车信息
         let car_deatil=await carDao.GetAllCarDeatil(uid);
         console.log("获取购物车信息",car_deatil);
         if(car_deatil.length===0){
             return result.responseData(-1,{});
         }
        //  获取用户的默认地址
        let user=await userDao.GetUserById(uid);
        let order_address=user[0].address;
        

        //  计算订单总价格
         for(var i=0;i<car_deatil.length;i++){
             toprice=toprice+(car_deatil[i].num)*(car_deatil[i].price);
         }
         let pldate=time.curentTime();
        //  新增订单
        console.log("新增订单输入信息  uid: "+uid+"   pldate:   "+pldate+"   toprice:   "+toprice);
         let a=await orderDao.AddOrder(uid,pldate,toprice,order_address);
         console.log("新增订单完成",a);



        //  添加订单详情
        let order= await orderDao.GetOrderBytime(uid,pldate);
        let oid=order[0].idorder;
        console.log("oid",oid);
        for(var j=0;j<car_deatil.length;j++){
            let {gid,num,price}=car_deatil[j];
            console.log("gid: "+gid+"num: "+num+"price: "+price)
            await orderDao.AdddOrderDetail(gid,oid,num,price);
        }

        // 清空购物车
        for(var k=0;k<car_deatil.length;k++){
            await carDao.DelCarDetail(car_deatil[k].idcar_deatil);
        }

        return result.responseData(0,{idorder:oid,order_address:order_address});



    },

       /**
   * 获取所有订单
   * @param {Object} ctx
   */
  GetAllOrder: async(ctx)=>{
    let {iduser,token}=ctx;
    let uid=iduser;
    let toprice=0;
     // 登录校验
     iduser=parseInt(uid); 
     if(!checkLogin.isLogin(token)){
         return {code:8,msg:'用户未登录请登录后操作'}
     }
    //  获取用户的指定订单信息数组

     let orders=await orderDao.GetOrders(uid);
     if(orders.length===0){
         return result.responseData(-1,{});
     }

    //  获取订单详情
     let order_details=[];

     for(var j=0;j<orders.length;j++){


        let order_details_oid= await  orderDao.GetOrderDetails(orders[j].idorder);
        console.log("order_details_oid",order_details_oid.length);



        // for(let k=0;k<order_details_oid.length;k++){
        //     console.log("k",k);
        // }


        for(let k=0;k<order_details_oid.length;k++){
            let id=order_details_oid[k].gid;
            console.log("******************");
            let good=await goodDao.GetGoodsById(id);
            order_details_oid[k].good=good;
        }
        let obj={
            pldate:orders[j].pldate,
            toprice:orders[j].toprice,
            type:orders[j].type,
            order_details_oid:order_details_oid
        }
      
        order_details.push(obj);
     }


     return result.responseData(0,order_details);




  },

      /**
   * 按类别获取所有订单
   * @param {Object} ctx
   */
  GetOrderByType: async (ctx)=>{

    let {iduser,type,token}=ctx;
    let uid=iduser;
     // 登录校验
     iduser=parseInt(uid); 
     if(!checkLogin.isLogin(token)){
         return {code:8,msg:'用户未登录请登录后操作'}
     }

      //  获取用户的指定订单id数组


      //  获取用户的指定订单信息数组
      let orders=await orderDao.GetOrdersByType(uid,type);
      if(orders.length===0){
          return result.responseData(-1,{});
      }
 
     //  获取订单详情
      let order_details=[];
 
      for(var j=0;j<orders.length;j++){
 
 
         let order_details_oid= await  orderDao.GetOrderDetails(orders[j].idorder);
         console.log("order_details_oid",order_details_oid.length);
 
 
 
         // for(let k=0;k<order_details_oid.length;k++){
         //     console.log("k",k);
         // }
 
 
         for(let k=0;k<order_details_oid.length;k++){
             let id=order_details_oid[k].gid;
             console.log("******************");
             let good=await goodDao.GetGoodsById(id);
             order_details_oid[k].good=good;
         }
         let obj={
             pldate:orders[j].pldate,
             toprice:orders[j].toprice,
             type:orders[j].type,
             order_details_oid:order_details_oid
         }
       
         order_details.push(obj);
      }
 
 
      return result.responseData(0,order_details);
 
 
 
  },

       /**
   * 支付订单并清空购物车
   * @param {Object} ctx
   */
  PayOrder:async(ctx)=>{
      let {iduser,idorder,token}=ctx;
      let uid=iduser;
       // 登录校验
     iduser=parseInt(uid); 
     if(!checkLogin.isLogin(token)){
         return {code:8,msg:'用户未登录请登录后操作'}
     }

    // 修改购物车状态未支付

    await orderDao.UudateOder(idorder);

    return result.responseData(0,{});

  },
        /**
   * 按idorder获取单个订单信息
   * @param {Object} ctx
   */
  GetOrder:async(ctx)=>{
    let {iduser,idorder,token}=ctx;
    let uid=iduser;
     // 登录校验
   iduser=parseInt(uid); 
   if(!checkLogin.isLogin(token)){
       return {code:8,msg:'用户未登录请登录后操作'}
   }
   const order=await orderDao.GetOrderById(idorder);

   for(let i=0;i<order.length;i++){
       let gid=order[i].gid;
       let good=await goodDao.GetGoodsById(gid);
       order[i].good=good[0];
   }
   return result.responseData(0,order);
  },
  /**
   * @description: 更新订单的地址
   * @param {object}
   * @return {*}
   */  
  UpDateOrderAddress:async(ctx)=>{
      let{idorder,order_address}=ctx;
      await orderDao.UpdateOrderAddress(order_address,idorder);
      return result.responseData(0,{});
  },
/**
 * @description: 分页获取所有订单
 * @param {object}
 * @return {*}
 */
GetOrderByLimit:async(ctx)=>{
    let {iduser,token,page,limit}=ctx;
    let uid=iduser;
    let toprice=0;
     // 登录校验
     iduser=parseInt(uid); 
     if(!checkLogin.isLogin(token)){
         return {code:8,msg:'用户未登录请登录后操作'}
     }

     let orders=await orderDao.GetOrdersBylimit(uid,page,limit);
// 获取订单详情
     let order_details=[];
     for(var j=0;j<orders.length;j++){


        let order_details_oid= await  orderDao.GetOrderDetails(orders[j].idorder);
        console.log("order_details_oid",order_details_oid.length);



        // for(let k=0;k<order_details_oid.length;k++){
        //     console.log("k",k);
        // }


        for(let k=0;k<order_details_oid.length;k++){
            let id=order_details_oid[k].gid;
            console.log("******************");
            let good=await goodDao.GetGoodsById(id);
            order_details_oid[k].good=good;
        }
        let obj={
            idorder:orders[j].idorder,
            pldate:orders[j].pldate,
            toprice:orders[j].toprice,
            type:orders[j].type,
            order_details_oid:order_details_oid
        }
      
        order_details.push(obj);
     }
     let res={
        order_details,
        total_num:orders.length
     }
     return result.responseData(0,res);


},
/**
 * @description: 分页获取指定类型的订单
 * @param {object}
 * @return {*}
 */ 
GetOrderByLimitAndType:async(ctx)=>{
    let {iduser,token,page,limit,type}=ctx;
    let uid=iduser;
    let toprice=0;
     // 登录校验
     iduser=parseInt(uid); 
     if(!checkLogin.isLogin(token)){
         return {code:8,msg:'用户未登录请登录后操作'}
     }
     console.log("收到的类型为",type)

     let orders=await orderDao.GetOrdersByTypeAndLimit(uid,type,page,limit);
    
// 获取订单详情
     let order_details=[];
     for(var j=0;j<orders.length;j++){


        let order_details_oid= await  orderDao.GetOrderDetails(orders[j].idorder);
        console.log("order_details_oid",order_details_oid.length);



        // for(let k=0;k<order_details_oid.length;k++){
        //     console.log("k",k);
        // }


        for(let k=0;k<order_details_oid.length;k++){
            let id=order_details_oid[k].gid;
            console.log("******************");
            let good=await goodDao.GetGoodsById(id);
            order_details_oid[k].good=good;
        }
        let obj={
            idorder:orders[j].idorder,
            pldate:orders[j].pldate,
            toprice:orders[j].toprice,
            type:orders[j].type,
            order_details_oid:order_details_oid
        }
      
        order_details.push(obj);
     }
 
     return result.responseData(0,order_details);


},
/**
 * @description: 获取订单的数目
 * @param {*}
 * @return {*}
 */
GetOrdersNum:async(ctx)=>{
    let {iduser}=ctx;
    let uid=iduser;
    let orders=await orderDao.GetOrders(uid);
    if(orders.length>0){
    return result.responseData(0,{num:orders.length});
    }
    else{
        return result.responseData(-1,{});
    }
},
/**
 * @description: 获取指定类型订单的数目
 * @param {*}
 * @return {*}
 */
 GetTypeOrdersNum:async(ctx)=>{
    let {iduser,type}=ctx;
    let uid=iduser;
    let orders=await orderDao.GetOrdersByType(uid,type);
    if(orders.length>0){
    return result.responseData(0,{num:orders.length});
    }
    else{
        return result.responseData(-1,{});
    }
}

}