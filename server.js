// PACKAGES
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var morgan = require('morgan')
var mongoose = require('mongoose')
var config = require('./config')
var path = require('path')
var bearerToken = require('express-bearer-token')
var passport = require('passport')
var FacebookTokenStrategy = require('passport-facebook-token')

// Inicializar passport
app.use(passport.initialize())
app.use(passport.session())

// CONFIG
var port = process.env.PORT || 3000
mongoose.connect(config.database)

// Obtiene el bearer token y lo guarda en req.token
app.use(bearerToken())

// Log en consola del servidor
app.use(morgan('dev'))

// Cargar cargar carpeta pública
app.use(express.static(path.join(__dirname, 'public')))

// Facebook Auth
var users = require('./app/routes/users')

passport.use(new FacebookTokenStrategy({
        clientID: config.fbClientId,
        clientSecret: config.fbClientSecret
    }, function(accessToken, refreshToken, profile, done) {
    users.findOrCreate(profile, function (error, user) {
        return done(error, user)
    })
  }
))

/*
passport.serializeUser(function(token, callback) {
	callback(null, token)
})
*/

// Facebook routes
app.post('/auth/facebook/token',
  passport.authenticate('facebook-token'),
  function (req, res) {
    // do something with req.user
    res.send(req.user ? 200 : 401)
  }
)

// API ROUTES
app.use('/api', require('./app/routing'))

// START THE SERVER
app.listen(port)
console.log('Magic happens at http://localhost:'+port)