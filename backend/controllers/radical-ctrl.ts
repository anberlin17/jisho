import { Radical, aliases } from '../models/radical-model'
import { stateFail, stateSuccess, decodeAliases } from './utils'

async function updateRadical(req, res) {
	const body = req.body

	if (!body) return stateFail(res, 400, { message: 'You must provide a body to update' })

	Radical.findOne({ _id: req.params.id })
		.then(
			radical => {
				if (!radical) return stateFail(res, 404, { message: 'Radical not found' })

				for (let key in radical) {
					if (radical.hasOwnProperty(key) && body[key]) {
						radical[key] = body[key]
					}
				}

				radical
					.save()
					.then(() => stateSuccess(res, 200, { id: radical._id, message: 'Radical updated!' }))
					.catch(error => stateFail(res, 404, { error, message: 'Radical not updated' }))
			},
			error => stateFail(res, 400, { error })
		)
		.catch(err => console.error(err))
}

async function getRadical(req, res) {
	await Radical.find({}, undefined, { sort: { ss: 1 } })
		.then(
			radical => {
				if (!radical.length) return stateFail(res, 404, { message: 'Radical not found' })

				const data = decodeAliases(radical, aliases)
				return stateSuccess(res, 200, { data })
			},
			error => stateFail(res, 400, { error })
		)
		.catch(err => console.error(err))
}

export { updateRadical, getRadical }
