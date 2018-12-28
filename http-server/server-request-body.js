const http = require('http');
const port = 3000;

http.createServer(function(request, response){
    console.log(request.headers);
    console.log(request.method);
    console.log(request.statusCode);    
    console.log(request.url);    
    
    if(request.method == 'POST') {
        let buff = '';
        request.on('data', function(chunk){
            buff += chunk;
        });
        request.on('end', function(){
            console.log(`Body: ${buff}`);
            response.end('\nAccepted Body\n\n');
        });
    } else {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end('Hello world\n');
    }
}).listen(port);