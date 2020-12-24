//随机验证码
function RandomCode(){
    var codeStr = ''
    for (let i=0 ;i<6;i++){
        codeStr+=Math.floor(Math.random()*10)
    }
    return codeStr
}
//随机姓名
function RandomName(){
    var name ='用户'
    for (let i=0 ;i<12;i++){
        name+=Math.floor(Math.random()*10)
    }
    return name
}


exports.RandomCode=RandomCode
exports.RandomName=RandomName

