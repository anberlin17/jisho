import { Novel } from '../models/novel-model'
import { stateFail, stateSuccess } from './utils'

export async function getNovel({ params }, res) {
	const id = params.id

	try {
		const data = await Novel.find({ id })

		if (!data.length) {
			return stateFail(res, 404, { message: 'Novel not found' })
		}

		return stateSuccess(res, 200, { data })
	} catch (error) {
		return stateFail(res, 400, { error })
	}
}

export async function getNovelsList(req, res) {
	try {
		const data = await Novel.find()
		return stateSuccess(res, 200, { data })
	} catch (error) {
		return stateFail(res, 400, { error })
	}
}

export async function createNovel(req, res) {
	const data = req.body

	try {
		const novel = await Novel.create(data)
		stateSuccess(res, 201, { data: novel })
	} catch (error) {
		switch (error.code) {
			case 11000:
				return stateFail(res, 409, { message: 'DuplicateKey. Novel already exists' })
			default:
				return stateFail(res, 400, { error })
		}
	}
}
