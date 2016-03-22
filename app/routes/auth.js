var jwt = require('jsonwebtoken')
var config = require('../../config')
var User = require('../models/user')

// Authenticate a user without middleware
module.exports = function (req, res) {
	User.findOne({
		name: req.body.name
	}, function (err, user) {
		if (err) res.json(err)

		if (!user)
			res.json({sucess: false, message: 'Authentication failed. User not found.'})
		else if(user){
			if (user.password != req.body.password)
				res.json({success: false, message: 'Authentication failed. Wrong password.'})
			else{
				var token = jwt.sign(user, config.secret, {
					expiresInMinutes: 1440
				})

				res.json({
					success: true,
					message: 'Enjoy your token!',
					token: token
				})
			}
		}
	})
}