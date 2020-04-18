const { verifyToken } = require('../helpers/jwt')
const { User, Text } = require('../models')

function emailAuth(req, res, next) {
	try {
		let decodedToken = verifyToken(req.headers.token)
		console.log(decodedToken)
		User.findOne({email: decodedToken.email})
		.then(user => {
			if (user) {
				req.emailUser = decodedToken.email
				next()
			} else {
				next({ status: 401, message: 'authentication failed'})
			}
		})
	} catch (error) {
		next({ status: 401, message: err })
	}
}


function authentication(req, res, next) {
	try {
		let decodedToken = verifyToken(req.headers.token)
		User.findById(decodedToken.id)
		.then(user => {
			if (user) {
				req.loggedUser = decodedToken
				next()
			} else {
				next({ status: 401, message: 'authentication failed'})
			}
		})
		.catch(next)
	}
	catch(err) {
		next({ status: 401, message: err })
	}
}

function authorization(req, res, next) {
	let { id } = req.params
	Text.findById(id)
	.then(text => {
		if (!text) {
			next({ status: 404, message: 'data not found' })
		} else if (text.userId == req.loggedUser.id) {
			next()
		} else {
			next({ status: 403, message: 'not authorize'})
		}
	})
	.catch(err => {
		next({ status: 403, message: err})
	})

}

module.exports = { emailAuth, authentication, authorization }

