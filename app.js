const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, "views/partials"))

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get("/beers", function(req, res) {
  
  punkAPI.getBeers()
  .then(beerResponse => {console.log(beerResponse)
  res.render("beers", {beerArr : beerResponse})})
  .catch(error => console.log(error));
})

app.get("/randomBeer", function(req, res) {

  punkAPI.getRandom()
  .then(randomBeer => {
    console.log(randomBeer)
    res.render("randomBeer", {beer : randomBeer})})
  .catch(error => console.log(error))
})

app.get("/beer/:id", function(req, res) {
 
  const id = req.params.id
  const display = punkAPI.getBeer(id)
  .then(beerResponse => { 
    console.log(beerResponse)
    res.render("beer", {beerResponse})})
    .catch(error => console.log(error));

})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
