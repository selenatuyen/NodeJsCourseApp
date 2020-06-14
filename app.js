const http = require('http');

const routes = require('./routes');

// same
// function reqListener(req, res){
// }
// http.createServer(reqListener);

//same
// http.createServer(function(req, res){
// });

console.log(routes.someText);
const server = http.createServer(routes.handler);

server.listen(3000);