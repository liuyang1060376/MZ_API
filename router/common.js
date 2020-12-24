const express = require('express');
const Router = express.Router()
const md5 = require('md5-node');
const sendCode = require('./../api/index')
//操作memcached
const client =require('./../api/memcached')
//处理数据的函数
const getDate = require('./../api/functions')


//获取验证码
Router.get('/getCode',(req,res)=>{
    let ACCOUNTSID='b52892e77808f80820927b7572661365'
    let AUTHTOKEN='cb67ba384b7e4627b4ab1d4d31cb758f'
    let timestamp=new Date().getTime();
    //签名
    let sig =md5(ACCOUNTSID+AUTHTOKEN+timestamp)
    let mobile = req.query.mobile
    //验证码
    let code = getDate.RandomCode()
    client.set(mobile,code,60)
    sendCode.getCode(mobile,timestamp,ACCOUNTSID,sig,code).then(data=>{
        if(data.status===200){
            res.json({
                code:200,
                data:'请求成功'
            })
        }else{
            res.json({
                code:40696,
                data:data.data
            })
        }
    })
})



module.exports=Router