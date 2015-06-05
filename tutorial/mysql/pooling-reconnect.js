/*
 连接池配置

 增加：
 连接池的超时测试
 http://blog.fens.me/nodejs-mysql-intro/
 */


var mysql = require('mysql');
var pool = mysql.createPool({
  host: 'localhost',
  user: 'ma',
  password: 'ma',
  database: 'machine_account',
  port: 3306
});

var selectSQL = "show variables like 'wait_timeout'";

pool.getConnection(function (err, conn) {
  if (err) console.log("POOL ==> " + err);

  function query() {
    conn.query(selectSQL, function (err, res) {
      console.log(new Date());
      console.log(res);
      conn.release();
    });
  }

  query();
  setInterval(query, 15000);
});