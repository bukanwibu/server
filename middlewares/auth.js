const { verifyToken } = require('../helpers/jwt')
const { User, Text } = require('../models')

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

module.exports = { authentication, authorization }

