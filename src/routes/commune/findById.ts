import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import { Commune } from '../../db/sequelize';


const findById = (app: Express) => {
  app.get('/api/commune/:id', (req: Request, res: Response) => {
    const id = req.params.id
    Commune.findByPk(id).then(commune => {
      if(commune === null){
        const message = `Commune with ID ${id} doesn't exist. Try with another ID!`
        return res.status(404).json({ message })
      }
      const message = `A commune with ID ${id} has been found!`
      res.json({ message, data: commune })
    }).catch(e => {
      const message = "Impossible to load commune. Retry later!"
      res.status(500).json({ message, data: e })
    })
  })
}

export default findById