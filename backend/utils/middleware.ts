import { Request, Response } from 'express'

function unavailable(req: Request, res: Response) {
	res.send('Get out of here!')
}

export default { unavailable }
