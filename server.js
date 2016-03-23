// PACKAGES
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var morgan = require('morgan')
var mongoose = require('mongoose')
var config = require('./config')
var path = require('path')

// CONFIG
var port = process.env.PORT || 3000
mongoose.connect(config.database)

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(morgan('dev'))

// Cargar cargar carpeta pública
app.use(express.static(path.join(__dirname, 'public')))

// ROUTES
app.use('/api', require('./app/routing'))

// START THE SERVER
app.listen(port)
console.log('Magic happens at http://localhost:'+port)