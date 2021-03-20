const express = require('express');
const request = require('postman-request')
const hbs = require('hbs');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

const viewsPath = path.join(__dirname, './templates/views');
const partialsPath = path.join(__dirname, './templates/partials');

app.use(express.static(__dirname));

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=31.5326&lon=35.0998&appid=1d12e3db7ac6113a91b73b7bdd637bd7';
let weather;
request(url, function(error, response) {
    console.log('error:', error);
    weather = JSON.parse(response.body);
});

app.set('view engine', 'hbs');
app.set('views', viewsPath);

hbs.registerPartials(partialsPath);

app.get('/', (req, res) => {
    res.render('index', {
        text: 'Welcome To Home Page',
        temp: Math.round(weather.main.temp - 273.15),

    });
});

app.get('/about', (req, res) => {
    res.render('about')
});

app.listen(PORT, () => {
    console.log(`listinig to port ${PORT}`)
});