import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { initDb } from './db/sequelize'
import routes from './routes/routes'

const app = express()
const port = 3000

app
   .use(morgan('dev'))
   .use(bodyParser.json())

initDb()

routes(app)

app.use(({res}) => {
  const message = `Path not found`
  res.status(404).json({message})
})

app.listen(port, () => console.log("[SUCCESS] Server started!"))