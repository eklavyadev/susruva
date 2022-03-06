import mysql from 'mysql'

const pool = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'susruva'
});

pool.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + pool.threadId);
});

export default pool;