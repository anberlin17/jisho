import { RequestHandler } from 'express'

import { isKana } from '../utils'
import { Vocabulary } from '../models/vocabulary-model'
import { stateFail, stateSuccess } from './utils'

export async function updateLexeme(req, res) {
	const body = req.body

	if (!body) return stateFail(res, 400, { message: 'You must provide a body to update' })

	Vocabulary.findOne({ _id: req.params.id })
		.then(
			vocabulary => {
				if (!vocabulary) return stateFail(res, 404, { message: 'Vocabulary not found' })

				for (let key in vocabulary) {
					if (vocabulary.hasOwnProperty(key) && body[key]) {
						vocabulary[key] = body[key]
					}
				}

				vocabulary
					.save()
					.then(() => stateSuccess(res, 200, { id: vocabulary._id, message: 'Vocabulary updated!' }))
					.catch(error => stateFail(res, 404, { error, message: 'Vocabulary not updated' }))
			},
			error => stateFail(res, 400, { error })
		)
		.catch(err => console.error(err))
}

export const getJLPTCollection =
	(jlpt: number): RequestHandler =>
	async (req, res) =>
		await Vocabulary.find({ tags: `jlpt${jlpt}` }, undefined, { limit: 50 })
			.then(
				lexeme => {
					if (!lexeme.length) {
						return stateFail(res, 404, { message: `Nothing found for ${jlpt}` })
					}
					return stateSuccess(res, 200, { data: lexeme })
				},
				error => stateFail(res, 400, { error })
			)
			.catch(err => console.error(err))

export async function getLexemeByCharacters({ params }, res) {
	const chars = params.chars

	if (!chars) {
		return stateFail(res, 400, { message: 'Passed invalid parameters' })
	}

	let filter: any
	if (isKana(chars)) {
		filter = {
			r_ele: {
				$elemMatch: { reb: { $regex: `${chars}` } },
			},
		}
	} else {
		filter = {
			k_ele: {
				$elemMatch: { keb: { $regex: `${chars}` } },
			},
		}
	}

	await Vocabulary.find(filter, undefined, { limit: 100, sort: { 'r_ele.0.re_pri.0': -1 } })
		.then(
			data => {
				if (!data.length) return stateSuccess(res, 200, { data: [], message: 'Lexeme not found' })
				return stateSuccess(res, 200, { data })
			},
			error => stateFail(res, 400, { error })
		)
		.catch(err => console.error(err))
}
