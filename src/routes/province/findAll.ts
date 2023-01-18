import { Request, Response } from 'express'
import { Express } from 'express-serve-static-core'
import { Province } from '../../db/sequelize'

const findAll = (app: Express) => {
  app.get("/api/provinces", (req: Request, res: Response) => {
    Province.findAll({order: [['id', 'ASC']]}).then(provinces => {
      const message = "All province data is loaded successfully!"
      res.json({message, data: provinces})
    }).catch(e => {
      const message = "Impossible to load all province data. Retry later!"
      res.status(500).json({message, data: e})
    })
  })
}

export default findAll