const express = require('express')

const router = express.Router()
const userRouter = require('../routes/userRouter')
const textRouter = require('../routes/textRouter')

router.get('/', function(req, res, next) {
	console.log('masuk')
	res.status(200).json({
		message: 'You are connected to server!'
	})
})

router.use('/users', userRouter)
router.use('/texts', textRouter)


module.exports = router
