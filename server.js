const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

// register director where partials are
hbs.registerPartials(__dirname + '/views/partials/');
// set handlebars as the view engine
app.set('view engine','hbs');

// register static folder
app.use(express.static(__dirname + '/public'));

// middleware example logs requests
app.use((req,res,next) => {
   var now = new Date().toString();
   var log = `${now}: ${req.method} ${req.url}`
   console.log(log);

   fs.appendFile('requestLog.txt', log + '\n',  (err) =>{
      if(err){
          console.log('Unable to append to requestLog');
      }
   });

   next()
});


// function can be used in a hbs file
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear() ;
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});


app.get('/', (req,res) => {
    res.render('index.hbs');
});

app.get('/about', (req,res)=>{
   res.render('about.hbs',{
       pageTitle:'About Page 123',
       // currentYear: new Date().getFullYear()
   });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});