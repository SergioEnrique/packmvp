// PACKAGES
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var morgan = require('morgan')
var mongoose = require('mongoose')
var path = require('path')
var cors = require('cors')
var qs = require('querystring')

// CONFIG
var config = require('./config')
var port = process.env.PORT || 3000
mongoose.connect(config.DATABASE)
app.use(cors());

// Log en consola del servidor
app.use(morgan('dev'))

// Body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Force HTTPS on Heroku
if (app.get('env') === 'production') {
	app.use(function(req, res, next) {
		var protocol = req.get('x-forwarded-proto')
		protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url)
	})
}

// Cargar cargar carpeta pública
app.use(express.static(path.join(__dirname, 'public')))

// API ROUTES
app.use('/api', require('./app/routing'))

// START THE SERVER
app.listen(port)
console.log('Magic happens at http://localhost:'+port)