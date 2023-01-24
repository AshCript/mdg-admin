import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { initDb } from './db/sequelize'
import routes from './routes/routes'

const app = express()
const port = process.env.PORT || 3000

app
   .use(morgan('dev'))
   .use(bodyParser.json())

initDb()

routes(app)

app.use((req: Request, res: Response, next: NextFunction) => {
  const message = `Path not found 😵‍💫`
  res.status(404).json({message})
  next()
})

app.listen(port, () => console.log(`[SUCCESS] Server started on port : ${port}`))