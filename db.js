import mysql from 'mysql'

const pool = mysql.createPool({
  host     : 'db4free.net',
  user     : 'liveuser',
  password : '12345678',
  database : 'etuition'
});
// db4free.net liveuser 12345678 etuition
// pool.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }

//   console.log('connected as id ' + pool.threadId);
// });

export default pool;