import { Request, Response } from 'express'
import { Express } from 'express-serve-static-core'
import { Region } from '../../db/sequelize'

const findAll = (app: Express) => {
  app.get('/api/regions', (req: Request, res: Response) => {
    Region.findAll().then(regions => {
      if(regions.length === 0){
        const message = "No data found for region"
        return res.status(404).json({ message, data: regions })
      }
      const message = `${regions.length} ${regions.length > 1 ? 'regions':'region'} has been found!`
      res.json({ message, data: regions })
    }).catch(e => {
      const message = "Something went wrong! Retry later."
      res.status(500).json({ message })
    })
  })
}

export default findAll