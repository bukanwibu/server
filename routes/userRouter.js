const router = require('express').Router()
const UserController = require('../controllers/userController')
const nodemailer = require('nodemailer')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/sendmail', function(req, res, next) {
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'codycanbe20@gmail.com',
			pass: 'Ssstitsasecret!'
		}
	})

	let mailOptions = {
		from: 'codycanbe20@gmail.com',
		to: 'devitas700@gmail.com',
		subject: 'test',
		text: 'hello world!'
		
	}

	transporter.sendMail(mailOptions, function(error, info) {
		if (error) console.log(error.message)
		else console.log(info.response)
	})
})



























module.exports = router
