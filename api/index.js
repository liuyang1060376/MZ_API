const ajax = require('./ajax')

exports.getCode =(mobile,timestamp,ACCOUNTSID,sig)=>
    ajax('https://openapi.miaodiyun.com/distributor/sendSMS',
    {accountSid:ACCOUNTSID,to:mobile,templateid:'256297',param:"1,2,3,4,5",timestamp:timestamp,sig:sig},
    'POST')