import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import { ValidationError, UniqueConstraintError } from 'sequelize';
import { District, Region } from '../../db/sequelize';

const add = (app: Express) => {
  app.post('/api/district', (req: Request, res: Response) => {
    const regionId = req.body.regionId
    Region.findByPk(regionId).then(region => {
      if(region === null){
        const message = `The foreign key regionId = ${regionId} doesn't exist. Retry with another regionId`
        res.status(404).json({ message })
      }
      return District.create(req.body).then((district:any) => {
        const message = `District ${district.name} added successfully!`
        res.json({ message, data: district })
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