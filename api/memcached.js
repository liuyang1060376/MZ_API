
'操作实例 https://www.npmjs.com/package/node_memcached'
{
    // var PORT = 11211;
// var HOST = '127.0.0.1';
//
// var memcached = require("node_memcached");
//
// var client = memcached.createClient(PORT, HOST);
//
// client.on("error", function (err) {
//     console.log("Error " + err);
// });
//
// // 10 为过期时间， 10秒
// client.set('hello', 'world', 10);
//
// client.get('hello', function(err, res) {
//     console.log(err, res);
// });
//
// // 也可以不用设置过期时间
// client.set('number', 1);
//
// client.increment('number', 2);
//
// client.decrement('number', 1);
//
// client.get('number', function(err, res) {
//     console.log(err, res);
// });
}
var PORT = 11211;
var HOST = '127.0.0.1';

const memcached = require("node_memcached");

var client = memcached.createClient(PORT, HOST);

client.on("error", function (err) {
    console.log("Error " + err);
});

// 10 为过期时间， 10秒
// client.set('hello', 'world', 15);

// client.get('17775207121', function(err, res) {
//     console.log(err, res);
// });
// //
// // 也可以不用设置过期时间
// client.set('17775207122', '123456');
// //
// client.get('17775207122', function(err, res) {
//     console.log(err, res);
// });


module.exports=client