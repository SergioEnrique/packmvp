var express = require('express');
var router = express.Router();

var users = require('./routes/users')
var authentication = require('./authentication')
var authMiddleware = require('./authMiddleware')

var User = require('./models/user')

// Rutas sin middleware de autenticación
router.post('/users', users.create)

// Middleware de autenticación
router.use('/auth/facebook', authentication)

/*
 |--------------------------------------------------------------------------
 | GET /api/me
 |--------------------------------------------------------------------------
 */

router.get('/me', function(req, res) {
	User.findById(req.user, function(err, user) {
		res.send(user)
	})
})

// Rutas API
router.get('/users', users.list)
router.delete('/users', users.delall)

module.exports = router