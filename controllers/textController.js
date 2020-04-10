const Text = require('../models/text')

class TextController {
	
	static create(req, res, next) {
		Text.create({
			data: req.body.data,
			userId: req.loggedUser.id
		})
		.then(text => {
			res.status(201).json(text)
		})
		.catch(next)
	}

	static showAll(req, res, next) {
		Text.find({ userId: req.loggedUser.id})
		.then(texts => {
			res.status(200).json(texts)
		})
		.catch(next)
	}

	static showOne(req, res, next) {
		const { id } = req.params
		Text.findById(id)
		.then(text => {
			if (!text) throw ({message: 'data not found'})
			res.status(200).json(text)
		})
		.catch(next)
	}

	static delete(req, res, next) {
		const { id } = req.params
		Text.findByIdAndDelete(id)
		.then(text => {
			if (!text) throw ({ message: 'data not found'})
			res.status(200).json({text})
		})
		.catch(next)
	}
}

module.exports = TextController
