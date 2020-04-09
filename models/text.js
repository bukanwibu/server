const { Schema, model } = require('mongoose')

const textSchema = new Schema({
	data: {
		type: String,
		required: [true, 'data is required']
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
},{
	timestamps: true
})

const Text = model('Text', textSchema)

module.exports = Text
