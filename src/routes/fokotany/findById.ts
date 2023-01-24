import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import auth from '../../auth/auth';
import { Fokotany } from '../../db/sequelize';


const findById = (app: Express) => {
  app.get('/api/fokotany/:id', auth(['anon', 'user', 'admin']), (req: Request, res: Response) => {
    const id = req.params.id
    Fokotany.findByPk(id).then((fokotany: any) => {
      if(fokotany === null){
        const message = `Fokotany with ID ${id} doesn't exist. Try another ID!`
        return res.status(404).json({ message })
      }
      const message = `A Fokotany has been found!`
      res.json({ message, data: fokotany })
    }).catch(e => {
      const message = "Something went wrong. Retry later!"
      res.status(500).json({ message, data: e })
    })
  })
}

export default findById