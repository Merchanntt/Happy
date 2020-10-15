import express from 'express'
import path from 'path'
import cors from 'cors'
import 'express-async-errors'

import './database/connections'
import router from './routes'
import errors from './errors/Handle'

const app = express()

app.use(cors())
app.use(express.json())
app.use(router)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(errors)

app.listen(3333)