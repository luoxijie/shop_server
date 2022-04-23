const express=require('express');
//express实例化
const app=express();
const session = require('express-session');

// 跨域
const cors=require('cors');
app.use(cors());





var goods=require('./app/routers/goodsRouter');
var user=require('./app/routers/userRouter');
var car=require('./app/routers/carRouter');
var order=require('./app/routers/orderRouter');

app.use('/goods',goods);
app.use('/user',user);
app.use('/car',car);
app.use('/order',order);
//最简单的api接口

app.listen(7000,()=>{
    //监听3000端口 开启服务器
    console.log("sever start");
})