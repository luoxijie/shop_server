/*
 * @Author: your name
 * @Date: 2021-09-08 12:43:13
 * @LastEditTime: 2021-10-21 10:41:29
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \ShopCityServer\app\routers\carRouter.js
 */
var express = require('express');
var router = express.Router();
var carControllers=require('../controllers/carControllers');


const bodyparser = require('body-parser');

//解析表单数据： x-www-from-urlencoded
router.use(bodyparser.urlencoded({ extended: false }))
//解析json数据
router.use(bodyparser.json());


router.post('/getCarDetail',function (req,res) {
     async function foo() {
        //  进入了购物车路由
    if(req.body.__proto__===undefined)Object.setPrototypeOf(req.body, new Object());
    var result=await carControllers.GetCarDetail(req.body);
     res.send(result);
 }
 foo();
})

router.post('/addCarDetail',function (req,res) {
    async function foo() {
       //  进入了购物车路由
   if(req.body.__proto__===undefined)Object.setPrototypeOf(req.body, new Object());
   var result=await carControllers.AddCarDetail(req.body);
    res.send(result);
}
foo();
})


router.post('/reduceCarDetail',function (req,res) {
    async function foo() {
       //  进入了购物车路由
   if(req.body.__proto__===undefined)Object.setPrototypeOf(req.body, new Object());
   var result=await carControllers.ReducueCarDetail(req.body);
    res.send(result);
}
foo();
})

router.post('/delCarDetail',function (req,res) {
    async function foo() {
       //  进入了购物车路由
   if(req.body.__proto__===undefined)Object.setPrototypeOf(req.body, new Object());
   console.log("进入了删除路由")
   var result=await carControllers.DelCarDetail(req.body);
    res.send(result);
}
foo();
})










module.exports = router;