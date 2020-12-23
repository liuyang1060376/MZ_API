const express = require('express')
const Router = express.Router()
const mysql = require('./../mysql')
const md5 = require('md5-node');
const sendCode = require('./../api/index')

//获取验证码
Router.get('/getCode',(req,res)=>{
    let ACCOUNTSID='b52892e77808f80820927b7572661365'
    let AUTHTOKEN='cb67ba384b7e4627b4ab1d4d31cb758f'
    let timestamp=new Date().getTime();
    let sig =md5(ACCOUNTSID+AUTHTOKEN+timestamp)
    let mobile = req.query.mobile
    sendCode.getCode(mobile,timestamp,ACCOUNTSID,sig).then(data=>{
        console.log(data.data)
        if(data.status===200){
            res.json({
                code:200,
                data:'请求成功'
            })
        }else{
            res.json({
                code:406,
                data:data.data
            })
        }
    })
})



//获取首页轮播图
Router.get('/getBanner',function (req, res) {
    console.log('访问了')
    mysql('select * from banner order by Id DESC').then(result=>{
        res.json({
            code:200,
            data:result
        })
    }).catch(function (err) {
        res.json({
            code:500,
            data:err
        })
    })
})

Router.get('api/getBanner',function (req, res) {
    res.send('fdlaksfjka')
})







module.exports=Router