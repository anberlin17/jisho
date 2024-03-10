import { Kanji, aliases } from '../models/kanji-model'
import { isKana } from '../utils'
import { stateFail, stateSuccess, decodeAliases } from './utils'

async function updateKanji(req, res) {
	const body = req.body

	if (!body) return stateFail(res, 400, { message: 'You must provide a body to update' })

	Kanji.findOne({ _id: req.params.id })
		.then(
			kanji => {
				if (!kanji) return stateFail(res, 404, { message: 'Kanji not found' })

				for (let key in kanji) {
					if (kanji.hasOwnProperty(key) && body[key]) {
						kanji[key] = body[key]
					}
				}

				kanji
					.save()
					.then(() => stateSuccess(res, 200, { id: kanji._id, message: 'Kanji updated!' }))
					.catch(error => stateFail(res, 404, { error, message: 'Kanji not updated' }))
			},
			error => stateFail(res, 400, { error })
		)
		.catch(err => console.error(err))
}

async function getKanji(req, res) {
	await Kanji.find(req.query)
		.then(
			kanji => {
				if (!kanji.length) return stateFail(res, 404, { message: 'Kanji not found' })

				const data = decodeAliases(kanji, aliases)
				return stateSuccess(res, 200, { data })
			},
			error => stateFail(res, 400, { error })
		)
		.catch(err => console.error(err))
}

export const getKanjiByReading = async ({ params }, res) => {
	let filter: any
	const characters = params.characters
	if (isKana(characters)) {
		filter = {
			ron: {
				$elemMatch: { $regex: `${characters}` },
			},
		}
	}

	await Kanji.find(filter, undefined, { limit: 100 })
		.then(
			kanji => {
				if (!kanji.length) return stateFail(res, 404, { message: 'Kanji not found' })

				const data = decodeAliases(kanji, aliases)
				return stateSuccess(res, 200, { data })
			},
			error => stateFail(res, 400, { error })
		)
		.catch(err => console.error(err))
}

function getJLPTCollection(jlpt) {
	return async (req, res) =>
		await Kanji.find({ jlpt })
			.then(
				kanji => {
					if (!kanji.length) return stateFail(res, 404, { message: 'Kanji not found' })

					const data = decodeAliases(kanji, aliases)
					return stateSuccess(res, 200, { data })
				},
				error => stateFail(res, 400, { error })
			)
			.catch(err => console.error(err))
}

export { getJLPTCollection, updateKanji, getKanji }
