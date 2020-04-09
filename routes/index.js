const express = require('express')

const router = express.Router()

router.get('/', function(req, res, next) {
	console.log('masuk')
	res.status(200).json({
		message: 'You are connected to server!'
	})
})

module.exports = router
