/*
 * @Description: 商品模块控制器,业务逻辑层
 * @Author: hai-27
 * @Date: 2020-02-07 16:51:56
 * @LastEditors: hai-27
 * @LastEditTime: 2020-02-27 15:41:11
 */
const goodsDao = require('../dao/goodsDao');
const result=require('../../untils/responseData');
module.exports = {
    /**
   * 根据商品id,获取商品详细信息
   * @param {Object} ctx
   */
     GetGoodById: async ctx => {
    let {id}=ctx;
    let data=await goodsDao.GetGoodsById(id);
    if(data.length==0){
      return result.responseData(-1,{});
    }
      return  result.responseData(0,data);
    },
      /**
   * 根据page,limit,分页获取多个商品信息
   * @param {Object} ctx
   */
  GetGoodsByLimt: async ctx =>{
    let{page,limit}=ctx;
    let data=await goodsDao.GetGoodsByLimit(page,limit);
    if(data.length==0){
      return result.responseData(-1,{});
    }
    return result.responseData(0,data);
    
  },
    /**
   * 根据type,page,limit,分页获取指定类型的多个商品信息
   * @param {Object} ctx
   */
     GetGoodsBytype: async ctx =>{
       let{type,page,limit}=ctx;
       let data=await goodsDao.GetGoodsBytype(type,page,limit);
       if(data.length==0){
        return result.responseData(-1,{});
      }
      return result.responseData(0,data);
     },
       /**
   * 根据search,page,limit,模糊搜索并分页
   * @param {Object} ctx 
   */
    GetGoodsBySearch: async ctx=>{
      let {search,page,limit}=ctx;
      if(search===null||search===""){
        return {
          code:10,
          msg:"关键词不能为空"
        }
      }
      let data=await goodsDao.GetGoodsBySearch(search,page,limit);
      if(data.length==0){
        return result.responseData(-1,{});
      }
      return result.responseData(0,data);

    }





}