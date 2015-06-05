/*
 MySQL断线重连

 分别模拟3种错误

 登陆密码错误
 数据库宕机（正常启动node，然后杀掉mysqld的进程。）
 数据库连接超时
 */
var mysql = require('mysql');
var conn;
function handleError() {
  conn = mysql.createConnection({
    host: 'localhost',
    user: 'ma',
    password: 'ma', // 1)模拟密码错误，把 ma 改为 ma1
    database: 'machine_account',
    port: 3306
  });

  //连接错误，2秒重试
  conn.connect(function (err) {
    if (err) {
      console.log('error when connecting to db:', err);
      setTimeout(handleError, 2000);
    }
  });

  conn.on('error', function (err) {
    console.log('db error', err);
    // 如果是连接断开，自动重新连接
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleError();
    } else {
      throw err;
    }
  });

  // 模拟连接超时，PROTOCOL_CONNECTION_LOST
  /*function query() {
    console.log(new Date());
    var sql = "show variables like 'wait_timeout'";
    conn.query(sql, function (err, res) {
      console.log(res);
    });
  }

  query();
  setInterval(query, 15 * 1000);
*/
}
handleError();
