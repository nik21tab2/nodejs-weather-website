const request = require('request')

const forcast = (longitude,latitude , callback) => 
{
    //const url = 'http://api.weatherstack.com/current?access_key=88a3c3839d7b438c9ba60d0288f71210&query=37.8267,-122.4233&units=s'

    const url = 'http://api.weatherstack.com/current?access_key=e84129bc20b99e3b1452c36379b4e3ff&query=' + longitude + ',' + latitude + '&units=f'

    request({url : url , json : true}, (error, response) => 
    {
        if(error)
        {
            callback('Unable to connect to location services',undefined)
        }
        else if (response.body.error)
        {
            callback('Unable to find forcast',undefined)
        }
        else
        {
            const tempFarenHeit = response.body.current.temperature
            const degrees= (tempFarenHeit - 32)*0.55
            callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently " + degrees + " degrees out. There is a " + response.body.current.precip + '% chance of rain.')

            //callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degress out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
        }

    })
}

module.exports = forcast