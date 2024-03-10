import mongoose from 'mongoose'

const { Schema, model } = mongoose

const novelSchema = new Schema({
	id: {
		type: String,
		required: true,
		unique: true,
	},
	title: {
		en: {
			type: String,
			required: true,
		},
		ja: {
			type: String,
			required: true,
		},
	},
	content: {
		type: String,
		required: true,
	},
})

export const Novel = model('Novel', novelSchema, 'novels')
