import mongoose from 'mongoose'

const { Schema, model } = mongoose

export const aliases = {
	chr: 'character',
	kxi: 'kangxiNumber',
	mng: 'meaning',
	ss: 'strokes',
	vnt: 'variant',
}

const radicalSchema = new Schema({
	chr: {
		type: String,
		required: true,
		alias: aliases.chr,
	},
	kxi: {
		type: Number,
		min: 1,
		max: 214,
		alias: aliases.kxi,
	},
	vnt: {
		type: String,
		alias: aliases.vnt,
	},
	mng: {
		type: String,
		alias: aliases.mng,
	},
	ss: {
		type: Number,
		required: true,
		min: 1,
		alias: aliases.ss,
	},
})

export const Radical = model('Radical', radicalSchema, 'radicals')
