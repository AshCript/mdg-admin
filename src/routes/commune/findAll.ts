import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import { Commune } from '../../db/sequelize';


const findAll = (app: Express) => {
  app.get('/api/communes', (req: Request, res: Response) => {
    Commune.findAll({order: [['id', 'ASC']]}).then(communes => {
      const found = `${communes.length} ${communes.length === 1 ? 'district' : 'communes'} found!`
      const message = `${communes.length === 0 ? found : "All communes data have been loaded successfully! " + found }`
      res.json({ message, data: communes })
    }).catch(e => {
      const message = "Impossible to load all communes. Retry later!"
      res.status(500).json({ message, data: e })
    })
  })
}

export default findAll