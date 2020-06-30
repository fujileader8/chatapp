var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'hs232605',
  database: 'list_app'
});
/*
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
*/
app.get('/', (req, res) => {
  connection.query(
    'SELECT * FROM items',
    (error, results) => {
      res.sendFile(__dirname + '/index.html',{items: results});
    }
  );
});




//on：イベント待ち受け
//emit：イベント発信
//io.sockets（.on）：接続しているソケット全部
//socket（.on）：接続しているソケットのみ
io.sockets.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.sockets.emit('chat message', '[' +socket.id+ ']' + msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
