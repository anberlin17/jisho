import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export default function connectDB() {
	const dbRoute = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PW}@root-z2j8z.mongodb.net/${process.env.MONGODB_DB}?retryWrites=true&w=majority`

	try {
		mongoose.connect(dbRoute)
	} catch (error) {
		console.error('Error connecting to the database', error)
	}

	const connection = mongoose.connection

	connection.on('error', e => console.error('Connection error', e.message))
	connection.once('open', () => console.log('Connected to the database'))

	mongoose.set('debug', (collectionName, method, query, doc) => {
		console.log(`${new Date().toLocaleTimeString()}: ${collectionName}.${method}`, JSON.stringify(query), doc)
	})

	process.on('SIGINT', function () {
		connection.close()
		console.log('Mongoose disconnected on app termination')
		process.exit(0)
	})
}
