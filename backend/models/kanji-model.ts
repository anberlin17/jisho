import mongoose from 'mongoose'

const { Schema, model } = mongoose

export const aliases = {
	chr: 'character',
	grd: 'grade',
	hsg: 'heisig',
	jlpt: 'jlpt',
	rkun: 'kunReadings',
	rname: 'nameReadings',
	ron: 'onReadings',
	mng: 'meaning',
	ss: 'strokes',
	ucd: 'unicode',
}

const kanjiSchema = new Schema({
	chr: {
		type: String,
		required: true,
		alias: aliases.chr,
	},
	grd: {
		type: Number,
		max: 10,
		alias: aliases.grd,
	},
	hsg: {
		type: String,
		alias: aliases.hsg,
	},
	jlpt: {
		type: Number,
		min: 0,
		max: 5,
	},
	rkun: {
		type: [String],
		alias: aliases.rkun,
	},
	rname: {
		type: [String],
		alias: aliases.rname,
	},
	ron: {
		type: [String],
		alias: aliases.ron,
	},
	mng: {
		type: [String],
		alias: aliases.mng,
	},
	ss: {
		type: Number,
		required: true,
		min: 1,
		alias: aliases.ss,
	},
	ucd: {
		type: String,
		required: true,
		unique: true,
		alias: aliases.ucd,
	},
})

export const Kanji = model('Kanji', kanjiSchema, 'kanji')
