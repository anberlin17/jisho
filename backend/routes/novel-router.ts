import { Router } from 'express'
import { getNovel, getNovelsList, createNovel } from '../controllers/novel-ctrl'

const router = Router()

router.get('/novels/:id', getNovel)
router.get('/novels', getNovelsList)

router.post('/novel', createNovel)

export default router
