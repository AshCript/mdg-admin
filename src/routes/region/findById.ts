import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import auth from '../../auth/auth';
import { Region } from '../../db/sequelize';


const findById = (app: Express) => {
  app.get('/api/region/:id', auth(['anon', 'user', 'admin']), (req: Request, res: Response) => {
    const id = req.params.id
    Region.findByPk(id).then(region => {
      if(region === null){
        const message = `Region not found for ID ${id}. Try with another ID`
        return res.status(404).json({ message })
      }
      const message = "A region has been found"
      res.json({ message, data: region })
    }).catch(e => {
      const message = "Something went wrong! Retry later"
      res.status(500).json({ message, data: e })
    })
  })
}

export default findById