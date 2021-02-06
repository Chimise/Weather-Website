const http = require('http');
const https = require('https');

const url = 'http://api.weatherstack.com/current?access_key=cdd52c08364fb67951ec38a460ef359a&query=6.0199,6.9148&units=f';

const request = http.request(url, (response) => {
    let data = '';
    response.on('data', (chunk) => {
        data += chunk.toString();

    })

    response.on('end', () => {
        body = JSON.parse(data);
        console.log(body);
    })

})
request.on('error', (error) => {
    console.log(error)
})

request.end();