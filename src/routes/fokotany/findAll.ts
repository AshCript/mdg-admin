import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import { Fokotany } from '../../db/sequelize';


const findAll = (app: Express) => {
  app.get('/api/fokotanys', (req: Request, res: Response) => {
    Fokotany.findAll().then(fokotanys => {
      const found = `${fokotanys.length} ${fokotanys.length === 1 ? 'fokotany' : 'fokotanys'} found!`
      const message = `${fokotanys.length === 0 ? found : "All fokotanys data have been loaded successfully! " + found }`
      res.json({ message, data: fokotanys })
    }).catch(e => {
      const message = "Impossible to load all fokotany. Retry later!"
      res.status(500).json({ message, data: e })
    })
  })
}

export default findAll