import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import auth from '../../auth/auth';
import { District } from '../../db/sequelize';


const findById = (app: Express) => {
  app.get('/api/district/:id', auth(['anon', 'user', 'admin']), (req: Request, res: Response) => {
    const id = req.params.id
    District.findByPk(id).then(district => {
      if(district === null){
        const message = `District with ID ${id} doesn't exist. Try with another ID!`
        return res.status(404).json({ message })
      }
      const message = `A district with ID ${id} has been found!`
      res.json({ message, data: district })
    }).catch(e => {
      const message = "Impossible to load district. Retry later!"
      res.status(500).json({ message, data: e })
    })
  })
}

export default findById