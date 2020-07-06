var http = require('http'), fs = require('fs');
const data = require('./data.js');

function serveStatic(res, path, contentType, responseCode){
    if(!responseCode) responseCode = 200;
    console.log('index.js');
    fs.readFile('index.js', (err, data) => {
        if (err) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
        }
        else{
          res.writeHead(responseCode, {'Content-Type': contentType});
          res.end(data.toString());        
        }

    });
}

http.createServer(function(req,res){
  console.log(req.url)
  var path = req.url.toLowerCase();
  switch(path) {
    case '/':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(`Home page:\n There are ${numberOfObjects} objects as follows: \n${allKingdoms}`);
      break;
    case '/about':
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(`About:\n ${aboutMe}`);
    break;
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('404: Page not found.');
      break;
    }
}).listen(process.env.PORT || 3000);
console.log('after createServer')

//get all data on kingdoms
let allKingdoms = JSON.stringify(data.getAll());
let numberOfObjects = data.numberOfObjects();
console.log(allKingdoms);
//about me block
let aboutMe = 'I am a NSC student looking to improve Node.js with Express skills';