var express = require('express');
var router = express.Router();

var goodscontrllers=require('../controllers/goodsControllers')
// define the about route
router.get('/getAllGoods', function(req, res) {
  // 异步发送
  async function foo() {
    console.log("进入了商品路由");
    var result=await goodscontrllers.GetCategory(req.query);
    res.send(result);
 }
 foo();
});
router.get('/getGoodById',function (req,res) {
  async function foo() {
    console.log("进入了商品路由");
    var result=await goodscontrllers.GetGoodById(req.query);
     res.send(result);
 }
 foo();
  
})
router.get('/getGoodsByLimit',function (req,res) {
  async function foo() {
    var result=await goodscontrllers.GetGoodsByLimt(req.query);
    res.send(result);    
  }
  foo();
  
})
router.get('/getGoodsBytype',function (req,res) {
 async function foo(){
  var result=await goodscontrllers.GetGoodsBytype(req.query);
  res.send(result);
 }
 foo();
  
})
router.get('/getGoodsBySearch',function (req,res){
  async function foo(){
    var result=await goodscontrllers.GetGoodsBySearch(req.query);
    res.send(result);
   }
   foo();
  
})

module.exports = router;