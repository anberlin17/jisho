import { Router } from 'express'

import { getJLPTCollection, getLexemeByCharacters, updateLexeme } from '../controllers/vocabulary-ctrl'

const router = Router()

router.get('/lexeme/search/:chars', getLexemeByCharacters)

router.get('/lexeme/jlpt5', getJLPTCollection(5))
router.get('/lexeme/jlpt4', getJLPTCollection(4))

router.put('/lexeme/:id', updateLexeme)

export default router
