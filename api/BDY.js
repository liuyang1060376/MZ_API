const BosClient1 = require('@baiducloud/sdk')
const BosClient = BosClient1.BosClient
const config = {
    endpoint: 'http://su.bcebos.com',         //传入Bucket所在区域域名
    credentials: {
        ak: '07b676403b194a508cfdf42e7c808955',         //您的AccessKey
        sk: 'f77bd403ac694c7fa822c39b38c00fa9'      //您的SecretAccessKey
    } };
let client = new BosClient(config);

let bucket = 'gdmztj'
//
// //创建bucket
// function createBucket(name) {
//     client.createBucket(bucket)
//         .then(function() {
//             console.log('成功')
//         })
//         .catch(function(error) {
//             console.log('失败')
//             console.log(error)
//         });
// }

//查看bocket的对象名
client.listObjects('gdmztj')
    .then(function (response) {
        var contents = response.body.contents;
        console.log(contents)
        for (var i = 0, l = contents.length; i < l; i++) {
        console.log(contents);
    }
    })
    .catch(function (error) {
        console.log(error)
        console.log('查询失败')
    });
// //查看bucket列表
// function getBucketList(){
//     client.listBuckets()
//         .then(function(response) {
//             (response.body.buckets || []).forEach(function (bucket) { console.log(bucket.name) })
//         })
//         .catch(function() {
//             // 查询失败，添加您自己的代码，处理异常
//         });
// }


//以字符串形式上传
// 以字符串形式上传
// client.putObjectFromString(bucket, '测试文件.txt', 'hello world')
//     .then(
//         console.log('成功')
//     )
//     .catch(
//        errors=>{
//            console.log(errors)
//        }
//     );
// 以文件形式上传，仅支持Node.js环境
function uploadFile(object,filepath) {
    client.putObjectFromFile('gdmztj', object, filepath)
        .then(result=>{

        })
        .catch(err=>{
            return '失败'
        });
    var newfilename='https://gdmztj.su.bcebos.com/'+object
    return newfilename

}

// function test(){
//     return '3'
// }
//
// let a=test()
// console.log(a)

module.exports=uploadFile
