const express = require('express');
const handlebars = require('express-handlebars')
const app = express();
const data = require('./data.js');

app.set('view engine', 'handlebars');
app.engine('.handlebars', handlebars( {
  layoutsDir: __dirname + '/views',
  defaultLayout: false
}));

app.get('/', (req, res) => {
  //get all data on kin gdoms
  res.render('home', { kingdoms : data.getAll()});
});

app.get('/detail', (req, res) => {
  let requestedKingdomName = req.query.item;
  let requestedKingdom = data
    .getAll()
    .find(kingdom => kingdom.name.toLowerCase() == requestedKingdomName.toLowerCase());
  if (requestedKingdom) {
    res.render('detail.handlebars', { kingdom : requestedKingdom });
    return;
  }
  
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.end(`Kingdom '${req.query.item}' not found.`);
});


app.get('/about', (req, res) => {
  //about me block
  let aboutMe = 'I am a NSC student looking to improve Node.js with Express skills';

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(`About:\n ${aboutMe}`);
});

app.get('*', function(req, res){
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.end('404: Page not found.');
});

app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);
