import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import { ValidationError, UniqueConstraintError } from 'sequelize';
import { Commune, Fokotany } from '../../db/sequelize';


const add = (app: Express) => {
  app.post('/api/fokotany', (req: Request, res: Response) => {
    const communeId = req.body.communeId
    Commune.findByPk(communeId).then((commune): any => {
      if(commune === null){
        const message = `Commune with ID ${communeId} doesn't exist. Try with another ID`
        return res.status(404).json({ message })
      }
      return Fokotany.create(req.body).then(fokotany => {
        const message = `Fokotany ${fokotany} added successfully!`
        res.json({ message, data: fokotany })
      })
    }).catch(e => {
      if(e instanceof ValidationError || e instanceof UniqueConstraintError){
        return res.status(400).json({ message: e.message, data: e})
      }
      const message = "Something went wrong. Retry later!"
      res.status(500).json({ message, data: e })
    })
  })
}

export default add