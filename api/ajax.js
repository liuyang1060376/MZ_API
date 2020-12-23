const axios = require('axios')
const qs = require('qs')
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

module.exports=function (url = '', params = {}, type = 'GET') {
    return new Promise((resolve,reject)=>{
        let paramsStr = '?'
        if(type === 'GET'){
            Object.keys(params).forEach(value => {
                paramsStr=paramsStr+value+'='+params[value]+'&'
            })
            //过滤最后的&
            if(paramsStr!==null){
                newParamsStr=paramsStr.substr(0,paramsStr.lastIndexOf('&'))
            }
            url+=url+newParamsStr
            promise=axios.get(url)
        }else{
            params=qs.stringify(params)
            promise=axios.post(url,params)
        }
        promise.then(function (response) {
            resolve(response)
        }).catch(function (err){
            reject(err)
        })
    })
}