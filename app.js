const express = require ('express')
const app = express()
const path = require('path')
const front = require('./router/front')
const common = require('./router/common')
var bodyParser = require('body-parser')
const session = require('express-session')

//解决跨域请求
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Content-Type','application/x-www-form-urlencoded')
    res.setHeader('Access-Control-Allow-Origin','*');

    next();
});

//获取post请求配置
app.use('/public/',express.static(path.join(__dirname,'/public')),function () {
    console.log(__dirname)
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
//session配置
app.use(session({
    secret :'123ffkl45', // 对session id 相关的cookie 进行签名
    resave : false,
    saveUninitialized: true // 是否保存未初始化的会话
}));


//路由配置
app.use('/',front)
app.use('/common',common)



app.listen(3000,'10.0.8.14',function () {
    console.log('执行成功')
})
