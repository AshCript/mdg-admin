import { Express } from 'express-serve-static-core'
import { Request, Response } from 'express'
import { Province, Region } from '../../db/sequelize'
import { ValidationError, UniqueConstraintError } from 'sequelize'

const add = (app: Express) => {
  app.post('/api/region', (req: Request, res: Response) => {
    Province.findByPk(req.body.provinceId).then((province): any => {
      if(province === null){
        const message = "The foreign key for province is not found! Try another province key"
        return res.status(404).json({ message})
      }
      return Region.create(req.body).then((region: any) => {
        const message = `Region ${region.name} is added successfully!`
        res.json({message, data: region})
      })
    }).catch(e => {
      if(e instanceof ValidationError || e instanceof UniqueConstraintError){
        return res.status(400).json({ message: e.message, data: e})
      }
      const message = "Server not responding! Retry later!"
      res.status(500).json({ message, data: e })
    })
  })
}

export default add