import express from 'express'
import { urlencoded, json } from 'body-parser'
import cors from 'cors'

import kanjiRouter from './routes/kanji-router'
import radicalRouter from './routes/radical-router'
import vocabularyRouter from './routes/vocabulary-router'
import novelRouter from './routes/novel-router'
import mw from './utils/middleware'
import connectDB from './config/db'

const app = express()
const API_PORT = 1337

connectDB()

app.use(cors())
app.use(urlencoded({ extended: true }))
app.use(json())
app.use('/api', kanjiRouter, radicalRouter, vocabularyRouter, novelRouter)

app.get('/', mw.unavailable)

app.listen(API_PORT, () => console.log(`Server running on port ${API_PORT}`))
