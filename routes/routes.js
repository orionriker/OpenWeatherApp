const express = require('express');
const router = express.Router();

// GET route to render the weatherapp index
router.get('/', (req, res) => {
    res.render('index', { weather: null, error: null });
});

// POST route to ge weather from OpenWeatherMap
router.post('/', (req, res) => {
    const city = req.body.city;
    const bfj = require('bfj');
    const path = './config.json';

    bfj
    .read(path)
    .then((config) => {
        const apiKey = config.openWeatherMapKey;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            res.render('index', { weather: data, error: null });
        })
        .catch(error => {
            res.render('index', { weather: null, error: error.message });
        });
    })
    .catch((error) => {
        console.log(error);
    });
});

module.exports = router;
