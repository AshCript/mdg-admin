import { Request, Response } from "express"
import { Express } from "express-serve-static-core"
import { ValidationError, UniqueConstraintError } from "sequelize"
import { Province } from "../../db/sequelize"

const add = (app: Express):any => {
  app.post('/api/province', (req: Request, res: Response) => {
    console.log(req.body.id)
    Province.findByPk(req.body.id).then((province: any): any => {
      if(province !== null){
        const message = `ID n°${province.id} already taken by ${province.name}`
        return res.status(401).json({message, data: province})
      }
      return Province.create(req.body).then((p: any) => {
        const message = `Province ${p.name} added successfully!`
        res.json({message, data: p})
      })
    }).catch(e => {
      if(e instanceof ValidationError || e instanceof UniqueConstraintError){
        return res.status(400).json({ message: e.message, data: e})
      }
      const message = `Error adding province data! Retry later!`
      res.status(500).json({message, data: e})
    })
  })
}

export default add