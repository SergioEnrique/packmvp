var User = require('../models/user')
var jwt = require('jsonwebtoken')
var config = require('../../config')

exports.list = function (req, res) {
	User.find({}, function (err, users) {
		res.json({success: true, users: users})
	})
}

exports.create = function (req, res) {

	if (req.body.name == '')
		res.send({success: false, message: 'No se especificó ningún nombre'})
	else if (req.body.password == '')
		res.send({success: false, message: 'No se especificó ningúna contraseña'})
	else{
		var user = new User()

		user.name = req.body.name
		user.password = req.body.password

		user.save(function (err, user) {
			if(err) res.send(err)

			res.json({success: true, message: 'User created.'})
		})
	}
}

exports.delall = function (req, res) {
	User.find({}, function (err, users) {
		if(err) res.send(err)
		users.forEach(function (user, index) {
			user.remove(function (err, user) {
				if(err) res.send(err)
				console.log('Usuario removido '+user.name)
			})
		})
	})
}

exports.findOrCreate = function (profile, callback) {
	
	User.findOne({facebookId:profile.id}, function (err, user) {
		if(err)
			callback(err)
		else
		{
			// No existe el usuario, se crea uno nuevo
			if (!user){
				var user = new User()

				user.name = profile.displayName
				user.facebookId = profile.id

				user.save(function (err, user) {
					if(err)
						callback('Error al crear el user')
					createToken(user, function (token) {
						callback(null, token)
					})
				})
			}
			// Si existe el usuario
			else
				createToken(user, function (token) {
					callback(null, token)
				})
		}
	})
}

function createToken(user, callback) {
	var token = jwt.sign({name: user.name}, config.secret, {
		expiresInMinutes: 1440
	})

	callback({
		success: true,
		message: 'Enjoy your token!',
		token: token
	})
}