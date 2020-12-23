const express = require ('express')
const app = express()
const front = require('./router/front')

//设置跨域请求
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use('/',front)


app.listen(3000,'0.0.0.0',function () {
    console.log('执行成功')
})