import { Request, Response } from 'express'
import { Express } from 'express-serve-static-core'
import { Region } from '../../db/sequelize'

const findAll = (app: Express) => {
  app.get('/api/regions', (req: Request, res: Response) => {
    Region.findAll({order: [['id', 'ASC']]}).then(regions => {
      const found = `${regions.length} ${regions.length === 1 ? 'region':'regions'} has been found!`
      const message = `${regions.length === 0 ? found : "All regions data has been loaded successfully! " + found}`
      res.json({ message, data: regions })
    }).catch(e => {
      const message = "Something went wrong! Retry later."
      res.status(500).json({ message })
    })
  })
}

export default findAll