var User = require('../models/user')

exports.list = function (req, res) {
	User.find({}, function (err, users) {
		res.json(users)
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
