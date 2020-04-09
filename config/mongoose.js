const mongoose = require('mongoose')
let mongoUri = process.env.MONGO_URI

const mongoConfig = {
	useCreateIndex: true,
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true
}

mongoose.connect(mongoUri, mongoConfig, function(err) {
	if (err) console.log('db disconnected')
	else console.log('db connected')
})
