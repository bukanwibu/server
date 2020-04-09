function errorHandler(err, req, res, next) {
	
	console.log(err)
	let status, message, error = []
	
	if (err.name == 'ValidationError') {
		status = 400
		for (let key in err.errors) {
			error.push(err.errors[key].message)
		}
	} else {
		status = 500
		error.push(err.message)
	}

	res.status(status).json({ error })

}

module.exports = errorHandler

