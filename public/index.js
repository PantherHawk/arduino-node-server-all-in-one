let sockjs = require('sockjs-client');
var sock = new sockjs('http://localhost:3000/echo');
 sock.onopen = function() {
     console.log('open');
     sock.send('test');
 };

 sock.onmessage = function(e) {
     console.log('message', e.data);
     // sock.close();
     g_messages.innerText = e.data;
 };

 sock.onclose = function() {
     console.log('close');
 };

console.log('yep you\'re serving the static js');
let g_messages = document.getElementById('messages');
