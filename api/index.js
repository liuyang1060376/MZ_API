const ajax = require('./ajax')

exports.getCode =(mobile,timestamp,ACCOUNTSID,sig,param)=>
    ajax('https://openapi.miaodiyun.com/distributor/sendSMS',
    {accountSid:ACCOUNTSID,to:mobile,templateid:'256357',param:param,timestamp:timestamp,sig:sig},
    'POST')