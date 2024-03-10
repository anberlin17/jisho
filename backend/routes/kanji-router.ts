import { Router } from 'express'

import { getKanji, getJLPTCollection, updateKanji, getKanjiByReading } from '../controllers/kanji-ctrl'

const router = Router()

router.get('/kanji', getKanji)

router.get('/kanji/reading', getKanjiByReading)

router.get('/kanji/jlpt5', getJLPTCollection(5))
router.get('/kanji/jlpt4', getJLPTCollection(4))
router.get('/kanji/jlpt3', getJLPTCollection(3))
router.get('/kanji/jlpt2', getJLPTCollection(2))
router.get('/kanji/jlpt1', getJLPTCollection(1))
router.get('/kanji/jlpt0', getJLPTCollection(0))

router.put('/kanji/:id', updateKanji)

export default router
