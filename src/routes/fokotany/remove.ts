import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import auth from '../../auth/auth';
import { Fokotany } from '../../db/sequelize';


const remove = (app: Express) => {
  app.delete('/api/fokotany/:id', auth(['admin']), (req: Request, res: Response) => {
    const id = req.params.id
    Fokotany.findByPk(id).then(fokotany => {
      if(fokotany === null){
        const message = `Fokotany with ID ${id} doesn't exist. Try another ID!`
        return res.status(404).json({ message })
      }
      const message = `Fokotany with ID ${id} deleted successfully!`
      res.json({ message, data: fokotany })
    }).catch(e => {
      const message = "Impossible to delete fokotany. Retry later!"
      res.status(500).json({ message, data: e })
    })
  })
}

export default remove