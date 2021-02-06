const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();
// Define path for Express config
const viewsPath = path.join(__dirname, '../templates/views')
const publicDirectoryPath = path.join(__dirname, '../public');
const partialPath = path.join(__dirname, '../templates/partials');


app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialPath);

app.use(express.static(publicDirectoryPath))

// app.get('/help', (req, res) => {
//     res.sendFile(path.join(__dirname, '../public/help.html'))
// })


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Welcome to Weather App',
        name: 'Chimise'
    })
});
app.get('/about', (req, res) => {

    res.render('about', {
        title: 'About Page',
        name: 'Chimise'
    })
});
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Get Help',
        support: 'Contact the response team to get started',
        name: 'Chimise'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address

            })
        })



    })


});

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        product: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Help article Not Found',
        name: 'Chimise'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Page Not Found',
        name: 'Chimise'
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})