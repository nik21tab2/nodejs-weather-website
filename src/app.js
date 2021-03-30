const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./Utils/geocode')
const forcast = require ('./Utils/forcast')



const app = express()

//define paths for express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req,res) => {
    res.render('index', {
        title : 'Weather App',
        name : 'Nikhil Kale'
    })
})

app.get('/help',(req,res) => {

    res.render('help',{
        message: 'this is Help',
        title: 'Help',
        name: 'Nikhil Kale'
    })

})

app.get('/about',(req,res) => {

    res.render('about',{
        title : 'About me',
        name : 'Nikhil Kale'
    })

})

app.get('/weather',(req,res) => {

    if(!req.query.address)
    {
        return res.send({
            error: 'could not get address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude, location} = {}) => {
        if(error)
        {
           return res.send({
                error: 'could not get address'
            })
        }
    
        forcast(longitude, latitude, (error, forcastData) => 
        {
            if(error)
            {
               return res.send({
                    error: 'could not get forecast'
                })
            }
    
            console.log(location)
            console.log(forcastData)

            res.send({
                location: location,
                forecast: forcastData
            })
        })
    })

})

app.get('/products',(req,res) => {
    if(!req.query.search)
    {
        return res.send({
            error: 'must provide search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(rep,res) => {

    res.render('404', {
        title : '404',
        name: 'Nikhil Kale',
        errorMessage: 'Help not found'
    })

})

app.get('*',(rep,res) => {

    res.render('404', {
        title : '404',
        name: 'Nikhil Kale',
        errorMessage: 'Page not found'
    })

})

app.listen(3000, () => {
    console.log('Serer is up')
})