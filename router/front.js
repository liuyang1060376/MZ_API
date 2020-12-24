const express = require('express')
const Router = express.Router()
const sql= require('./../mysql')
const client = require('./../api/memcached')
const getData = require('./../api/functions')



//获取首页轮播图
Router.get('/getBanner',function (req, res) {

    sql('select * from banner order by Id DESC').then(result=>{
        res.json({
            code:200,
            data:result
        })
    }).catch(function (err) {
        res.json({
            code:500,
            data:''
        })
    })
})

//登录接口,mobile,1为验证码登录，2为用户账号密码登录
Router.post('/login',function (req, res) {
    //验证码登录
    let type = req.body.type
    if (type===1){
        let mobile=req.body.mobile
        let code = req.body.code
        client.get(mobile,function (err,resp) {
            //判断验证码是否正确
            if(resp===code){
                //查找用户是否存在，存在则直接登录，不存在则创建账户
                sql("select * from frontusers where mobile="+mobile).then(result=>{
                    if(result[0]){
                        req.session.username=result[0].username
                        res.json({
                            code:200,
                            data:'登录成功'
                        })
                    }else{
                        let name = getData.RandomName()
                        sql("insert into frontusers (username,mobile,password) values ('"+name+"','"+mobile+"','1060376291')").then(result=>{
                                req.session.username=name
                            res.json({
                                    code:200,
                                    data:'登录成功'
                                })
                            }

                        ).catch(err=>{
                            res.json({
                                code:500,
                                data:'服务器内部错误'
                            })
                        })
                    }
                }).catch(err=>{
                    res.json({
                        code:500,
                        data:'服务器内部错误'
                    })
                })
            }else{

                res.json({
                    code:422,
                    data:'验证码错误'
                })
            }
        })
    }
    else{
    }
})

//判断用户是否登录
Router.get('/isLogin',(req,res)=>{
    var username = req.session.username

    if(username){
        sql("select * from frontusers where username='"+username+"'").then(result=>{
            if(result[0]){
                console.log('已登陆')
                res.json({
                    code:200,
                    data:{username:result[0].username,mobile:result[0].mobile}
                })
            }else{
                res.json({
                    code:423,
                    data:'用户未登录'
                })
            }
        }).catch(err=>{
            res.json({
                code:'500',
                data:'服务器内部错误'
            })
        })
    }else{
        res.json({
            code:423,
            data:'用户未登录'
        })
    }

})







module.exports=Router