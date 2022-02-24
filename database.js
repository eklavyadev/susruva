var mysql = require('mysql');
var client = mysql.createConnection({
  host     : 'db4free.net',
  user     : 'liveuser',
  password : '12345678',
  database : 'etuition'
});

client.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + client.threadId);
});


module.exports = client