import mysql from 'mysql'

const pool = mysql.createConnection({
  host     : 'db4free.net',
  user     : 'liveuser',
  password : '12345678',
  database : 'etuition'
});

pool.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + pool.threadId);
});

export default pool;