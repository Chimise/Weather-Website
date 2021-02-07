const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=cdd52c08364fb67951ec38a460ef359a&query=' + latitude + ',' + longitude + '&units=f';
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const data = body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. it feels like ' + body.current.feelslike + ' degrees out. The humidity is ' + body.current.humidity + '%.';

            callback(undefined, data)
        }
    })

}

module.exports = forecast;