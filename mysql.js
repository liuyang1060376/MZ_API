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


//
// #创建账户表
// CREATE TABLE IF NOT EXISTS account(
//     id INT(11)NOT NULL AUTO_INCREMENT PRIMARY KEY,
//     username VARCHAR(32)NOT NULL,
//     money DECIMAL(9,2)
// )ENGINE=INNODB;
// #插入用户数据
// INSERT INTO account(username,money)VALUES('A',1000.00);
// INSERT INTO account(username,money)VALUES('B',200.00);
//
// /*事务处理*/
// #  A账户汇款失败
// SELECT * FROM account;
// #第一步 关闭事务自动提交模式
// SET autocommit=0;
// #第二步 开始事务
// START TRANSACTION;
// #第三步 发现汇款失败，将事务回滚ROLLBACK ||  汇款成功将事件commit
// #假设语法错误
// UPDATE account SET money=money-500 WHERE username='A';
// SELECT * FROM account;
// UPDATE account SET money=money+200 WHERE username='B';
// ROLLBACK;
// #第四步 还原Mysql数据库的的自动提交
// SET autocommit=1;
// SELECT * FROM account;
//
//
// /*B接收汇款失败*/
// SELECT *FROM account ；
// SET autocommit =0;
// START TRANSACTION;
// UPDATE account SET money=money-500 WHERE username='A';
// SELECT * FROM account ;
// #假设语法错误
// UPDATE account SET money=money+200 WHERE username ='B';
// ROLLBACK;
// SET autocommit =1;
// SELECT * FROM account;
//
// #清除数据
// <pre name="code" class="sql">TRUNCATE account;