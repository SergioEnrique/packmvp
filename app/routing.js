var express = require('express');
var router = express.Router();

var users = require('./routes/users')

// Rutas sin middleware de autenticación
router.post('/users', users.create)
router.post('/auth', require('./routes/auth'))

// Middleware de autenticación
router.use(require('./auth_middleware'))

// Rutas API
router.get('/users', users.list)
router.delete('/users', users.delall)

module.exports = router