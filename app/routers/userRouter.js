var express = require('express');
var router = express.Router();
const bodyparser = require('body-parser');

//解析表单数据： x-www-from-urlencoded
router.use(bodyparser.urlencoded({ extended: false }))
//解析json数据
router.use(bodyparser.json());

var userControllers=require('../controllers/userControllers');

router.get('/register',function(req,res){
    async function foo() {
        console.log(req);
        var result=await userControllers.Register(req.query);
        res.send(result);
     }
     foo()
})

router.post('/login',function(req,res){
    async function foo() {
        console.log("进入了用户路由");
        var result=await userControllers.Login(req.body);
        res.send(result);
     }
     foo()
})


router.post('/test',function(req,res){
    async function foo() {
        console.log("进入了用户路由",req.body);
        var result=await userControllers.test(req.body);
        res.send(result);
     }
     foo()
})

router.post('/update',function(req,res){
    async function foo() {
        console.log("进入了用户路由");
        if(req.body.__proto__===undefined)Object.setPrototypeOf(req.body, new Object());
        var result=await userControllers.UpdateUser(req.body);
        res.send(result);
     }
     foo()
})






module.exports = router;