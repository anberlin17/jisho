import { Response } from 'express'

export function stateFail(res: Response, status: number, params: any) {
	return res.status(status).json({ success: false, ...params })
}

export function stateSuccess(res: Response, status: number, params: any) {
	return res.status(status).json({ success: true, ...params })
}

export function decodeAliases(data, aliases) {
	return data.map(dataKey => {
		const decodedData = {}

		for (let key in aliases) {
			decodedData[aliases[key]] = dataKey[key]
		}

		return decodedData
	})
}
