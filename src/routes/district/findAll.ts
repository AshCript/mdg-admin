import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import { District } from '../../db/sequelize';


const findAll = (app: Express) => {
  app.get('/api/districts', (req: Request, res: Response) => {
    District.findAll().then(districts => {
      const message = `All districts data have been loaded successfully! ${districts.length} ${districts.length === 1 ? 'district' : 'districts'} has been found!`
      res.json({ message, data: districts })
    })
  })
}

export default findAll