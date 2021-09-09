const mysql = require('mysql');

const localPool = mysql.createPool({
  connectionLimit : 10, //important
  host     : 'localhost',
  port     : '3316',
  user     : 'root',
  password : 'root',
  database : 'student_results',
  debug    :  false
});

const remotePool = mysql.createPool({
  connectionLimit : 10, //important
  host     : 'dt3bgg3gu6nqye5f.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  port     : '3306',
  user     : 'm5sihkfbnm1wjlx4',
  password : 'e9vl1h4t6i7okmmt',
  database : 'hywvt17js2yjybuk',
 });

  module.exports = {
    localPool,
    remotePool
  };