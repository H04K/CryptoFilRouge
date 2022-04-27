var http = require('http');
const port = 5000;

var server = http.createServer((req, res) => {

    switch (req.url) {
        case '/':
            res.write("Welcome back");
            res.end();
            break;
        case '/connect':
            res.write("Connection Page");
            res.end();
            break;
        default:
            res.end("404, Bad URL");
            break;
    }

});

server.listen(port);

console.log('Node.js web server at port '+port+' is running..')
