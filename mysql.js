const mysql  = require( 'mysql' );

var pool  = mysql.createPool( {
    connectionLimit : 50,
    // 主机名称，一般是本机
    host: 'localhost',
    // 数据库的端口号，如果不设置，默认是3306
    port: 3306,
    // 创建数据库时设置用户名
    user: 'root',
    // 创建数据库时设置的密码
    password: '12345678',
    // 创建的数据库
    database: 'MZTJ',
    multipleStatements : true  //是否允许执行多条sql语句
} );

function getdate(sql) {
    return new Promise(function (resolve, reject){
        pool.getConnection(function (err, connection) {
            if(err){
                reject(err);
                return
            }
            connection.query(sql,function (err,data) {
                //断开连接
                connection.release()
                if(err){
                    reject(err)
                    return ;
                }
                resolve(data)
            })
        })
    })
}
module.exports=getdate