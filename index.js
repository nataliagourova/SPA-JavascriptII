const express = require('express');
const handlebars = require('express-handlebars')
const app = express();
const data = require('./data.js');
//database model
const Kingdom = require('./models/kingdom');
const kingdom = require ('./kingdom');
const path = require( 'path');
// const kingdomRoute = require('./routes/kingdom');
const bodyParser = require('body-parser');


//Express app configuration
app.set('view engine', 'handlebars');
app.engine('.handlebars', handlebars( {
  layoutsDir: __dirname + '/views',
  defaultLayout: false
}));

    // app.get('/', (req, res) => {
    //   //get all data on kin gdoms
    //   res.render('home', { kingdoms : data.getAll()});
    // });
app.use('/api', require('cors')()); // set Access-Control-Allow-Origin header for api route
app.use(bodyParser.json());
//app.use(kingdomRoute);

    //this is a middleware function with three parameters
    // app.use((req, res, next) => {
    //     console.log(`${new Date().toString()} => ${req.originalUrl}`);
    //     //res.sendFile('')
    //     next();
    // })

app.get ('/', (req, res) => {
  kingdom
    .getAll()
    .then((kingdoms) => {
        res.render ('home', {kingdoms: kingdoms });
      })
    .catch((err) => {
    return next(err);
  });
});

//GET all
app.get('/api/kingdoms', (req, res, next) => {
  return kingdom.find({}).lean()
    .then((kingdoms)=> {
        // res.json sets appropriate status code and response header      
      res.json(kingdoms);
    })
    .catch(err => {return res.status(500)
      .send('Error occurred: database error.')});
});

//GET one
app.get('/api/kingdoms/:name', (req, res) => {
  kingdom.get(req.params.name)
    .then((foundKingdoms) => {
      if (foundKingdoms.length != 1) {
        res.status(404).send({ error : 'Couldn\'t find a kingdom in the DB with the name ' + req.params.name });
      } else {
        res.json(foundKingdoms[0]);
      }
    })
    .catch(err => res.status(500).send({ error : 'Unable to load the kingdom due to an internal error.' }));
});

//UPDATE one
app.put('/api/kingdoms/:name', (req, res) => {
  if(!req.params.name) {
    res.status(400).send({ error : 'Missing kingdom name' });
    return;
  }
  Kingdom.findOneAndUpdate(
      {name: req.params.name},
      req.body, 
      { returnOriginal: false, upsert: true, useFindAndModify : false})
    .then(updatedDoc => res.json(updatedDoc) )
    .catch(err => res.status(500).send( { error : 'Error updating the kingdom.' }));
})

//DELETE one
app.delete('/api/kingdoms/:name', (req, res) => {
  if(!req.params.name) {
      return res.status(400).send('Missing URL parameter: name');
  }
  Kingdom.findOneAndRemove({name: req.params.name})
      .then(result=> {
          // res.writeHead(200, {'Content-Type': 'text/plain'});
          console.log(' got delete result: ' + result);
          res.end(`Attempted to delete '${req.params.name}', deleted'${result}' item`);
      })
      .catch(
        err => {
          // res.writeHead(400, {'Content-Type': 'text/plain'});
          res.end(`Error deleting kingdom '${req.params.name}': '${err}'.`);
      })
  });


    // app.get('/delete', (req, res) => {
    //   let requestedKingdomName = req.query.item;
    //   Kingdom
    //     

    //a way to filter data in the api response:
    // res.json(books.map((a) => {
    //   // return only public book attributes
    //   return {
    //     title: a.title,
    //     author: a.author,
    //     description: a.description
    //   }
    // });
    // });

    // app.get('/kingdoms', (req, res, next) => {
    //   return Kingdom.find({}).lean()
    //     .then((kingdoms)=> {
    //       res.render('home', { kingdoms });
    //     })
    //     .catch(err => next(err));
    // });

app.get('/detail', (req, res) => {
  let requestedKingdomName = req.query.item;
  kingdom
    .get(requestedKingdomName)
    .then(kingdomFromDB => {
      res.render ('detail.handlebars', { kingdom : kingdomFromDB[0] });
    })
    .catch(
      err => {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end(`Error getting kingdom '${req.query.item}': '${err}'.`);
      }
    );
});

    // app.get('/detail', (req, res) => {
    //   let requestedKingdomName = req.query.item;
    //   let requestedKingdom = data
    //     .getAll()
    //     .find(kingdom => kingdom.name.toLowerCase() == requestedKingdomName.toLowerCase());
    //   if (requestedKingdom) {
    //     res.render('detail.handlebars', { kingdom : requestedKingdom });
    //     return;
    //   }
      
    //   res.writeHead(404, {'Content-Type': 'text/plain'});
    //   res.end(`Kingdom '${req.query.item}' not found.`);
    // });

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

//Handler for Error 500
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.sendFile(path.join(__dirname, '../public/500.html'))
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`)
);
