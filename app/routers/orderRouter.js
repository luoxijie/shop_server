/*
 * @Author: your name
 * @Date: 2021-09-09 16:06:46
 * @LastEditTime: 2021-12-08 12:47:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ShopCityServer\app\routers\orderRouter.js
 */
var express = require('express');
var router = express.Router();
var orderControllers=require('../controllers/orderControllers');


const bodyparser = require('body-parser');

//解析表单数据： x-www-from-urlencoded
router.use(bodyparser.urlencoded({ extended: false }))
//解析json数据
router.use(bodyparser.json());


router.post('/makeOrder',function (req,res) {
    async function foo() {
       //  进入了购物车路由
   if(req.body.__proto__===undefined)Object.setPrototypeOf(req.body, new Object());
   console.log("开始生成订单Rou");
   var result=await orderControllers.MakeOrder(req.body);
    res.send(result);
}
foo();
})

router.post('/getAllOrder',function (req,res) {
    async function foo() {
       //  进入了购物车路由
   if(req.body.__proto__===undefined)Object.setPrototypeOf(req.body, new Object());
//    var result=await orderControllers.GetAllOrder(req.body);
var result=await orderControllers.GetOrderByLimit(req.body);
    res.send(result);
}
foo();
})


// GetOrderByType
router.post('/getOrdersByType',function (req,res) {
    async function foo() {
       //  进入了购物车路由
   if(req.body.__proto__===undefined)Object.setPrototypeOf(req.body, new Object());
//    var result=await orderControllers.GetOrderByType(req.body);
var result=await orderControllers.GetOrderByLimitAndType(req.body);
    res.send(result);
}
foo();
})

router.post('/PayOrder',function (req,res) {
    async function foo() {
       //  进入了购物车路由
   if(req.body.__proto__===undefined)Object.setPrototypeOf(req.body, new Object());
   var result=await orderControllers.PayOrder(req.body);
    res.send(result);
}
foo();
})


router.post('/GetOrderById',function (req,res) {
    async function foo() {
       //  进入了购物车路由
   if(req.body.__proto__===undefined)Object.setPrototypeOf(req.body, new Object());
   var result=await orderControllers.GetOrder(req.body);
    res.send(result);
}
foo();
})

router.post('/UpdateAddress',function (req,res) {
    async function foo() {
       //  进入了购物车路由
   if(req.body.__proto__===undefined)Object.setPrototypeOf(req.body, new Object());
   var result=await orderControllers.UpDateOrderAddress(req.body);
    res.send(result);
}
foo();
})

router.post('/GetOrdersNum',function (req,res) {
    async function foo() {
       //  进入了购物车路由
   if(req.body.__proto__===undefined)Object.setPrototypeOf(req.body, new Object());
   var result=await orderControllers.GetOrdersNum(req.body);
    res.send(result);
}
foo();
})

router.post('/GetTypeOrdersNum',function (req,res) {
    async function foo() {
       //  进入了购物车路由
   if(req.body.__proto__===undefined)Object.setPrototypeOf(req.body, new Object());
   var result=await orderControllers.GetTypeOrdersNum(req.body);
    res.send(result);
}
foo();
})




module.exports = router;
