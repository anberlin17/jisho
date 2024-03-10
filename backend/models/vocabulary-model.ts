import mongoose from 'mongoose'

const { Schema, model } = mongoose

const vocabularySchema = new Schema({
	ent_seq: {
		type: String,
		required: true,
	},
	r_ele: {
		type: [
			{
				reb: String,
				re_pri: [String],
			},
		],
		required: true,
	},
	k_ele: {
		type: [
			{
				keb: String,
				ke_pri: [String],
			},
		],
	},
	sense: {
		type: [{}],
		required: true,
	},
})

export const Vocabulary = model('Vocabulary', vocabularySchema, 'vocabulary')
