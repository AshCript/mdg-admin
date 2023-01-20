import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import { District } from '../../db/sequelize';


const findAll = (app: Express) => {
  app.get('/api/districts', (req: Request, res: Response) => {
    District.findAll({order: [['id', 'ASC']]}).then(districts => {
      const found = `${districts.length} ${districts.length === 1 ? 'district' : 'districts'} found!`
      const message = `${districts.length === 0 ? found : "All districts data have been loaded successfully! " + found }`
      res.json({ message, data: districts })
    }).catch(e => {
      const message = "Impossible to load all districts. Retry later!"
      res.status(500).json({ message, data: e })
    })
  })
}

export default findAll