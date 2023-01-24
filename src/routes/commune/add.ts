import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import { UniqueConstraintError, ValidationError } from 'sequelize';
import auth from '../../auth/auth';
import { Commune, District } from '../../db/sequelize';

const add = (app: Express) => {
  app.post('/api/commune', auth(['admin']), (req: Request, res: Response) => {
    const districtId = req.body.districtId
    District.findByPk(districtId).then(district => {
      if(district === null){
        const message = `The foreign key districtId = ${districtId} doesn't exist. Retry with another districtId`
        res.status(404).json({ message })
      }
      return Commune.create(req.body).then((commune: any) => {
        const message = `Commune ${commune.name} added successfully!`
        res.json({ message, data: commune })
      })
    }).catch(e => {
      if(e instanceof ValidationError || e instanceof UniqueConstraintError){
        return res.status(400).json({ message: e.message, data: e})
      }
      const message = "Something went wrong! Retry later."
      res.status(500).json({ message, data: e })
    })
  })
}

export default add