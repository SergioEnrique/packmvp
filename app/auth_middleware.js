var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var config = require('../config')

// Route middleware to verify a token
router.use(function (req, res, next) {
	var token = req.body.token	|| req.query.token || req.headers['x-access-token']

	if (token) {
		jwt.verify(token, config.secret, function (err, decoded) {
			if(err)
				res.json({success: false, message: 'Failed to authenticate token.'})
			else{
				// El usuario decodificado se almacena en request para usar en otras rutas
				req.decoded = decoded
				next()
			}
		})
	}
	else{
		res.status(403).send({
			success: false,
			message: 'No token provided.'
		})
	}
})

module.exports = router