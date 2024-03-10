import { Router } from 'express'

import { getRadical, updateRadical } from '../controllers/radical-ctrl'

const router = Router()

router.get('/radicals', getRadical)
router.put('/radicals/:id', updateRadical)

export default router
