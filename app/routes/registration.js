var express = require('express');
var router = express.Router();
var User = require('../models/user')

// Create a sample user
router.get('/', function (req, res) {
	var nick = new User({
		name: 'Docser',
		password: '123',
		admin: true
	})

	nick.save(function (err) {
		if(err) throw err
		console.log('User saved succesfully')
		res.json({success: true})
	})
})

module.exports = router