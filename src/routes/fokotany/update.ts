import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import { ValidationError, UniqueConstraintError } from 'sequelize';
import { Fokotany } from '../../db/sequelize';


const update = (app: Express) => {
  app.put('/api/fokotany/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const newFokotany = req.body
    Fokotany.findByPk(id).then((fokotany): any => {
      if(fokotany === null){
        const message = `Fokotany with ID ${id} doesn't exist. Try with another ID!`
        return res.status(404).json({ message })
      }
      return Fokotany.update(req.body, {where: {id}}).then(_ => {
        const message = `Fokotany with ID ${id} updated successfully!`
        res.json({ message, data: {old: fokotany, new: newFokotany}})
      })
    }).catch(e => {
      if(e instanceof ValidationError || e instanceof UniqueConstraintError){
        return res.status(400).json({ message: e.message, data: e})
      }
      const message = "Impossible to update fokotany. Retry later!"
      res.status(500).json({ message })
    })
  })
}

export default update