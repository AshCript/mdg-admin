import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import { Commune } from '../../db/sequelize';


const update = (app: Express) => {
  app.put('/api/commune/:id', (req: Request, res: Response) => {
    const id = req.params.id
    Commune.findByPk(id).then((commune: any): any => {
      if(commune === null){
        const message = `Impossible to update commune with ID ${id}. It doesn't exist`
        return res.status(404).json({ message })
      }

      return Commune.update(req.body, {
        where: {id}
      }).then(_ => {
        return Commune.findByPk(id).then((newCommune: any) => {
          const message = `Commune with ID ${newCommune.id} updated successfully!`
          res.json({ message, data: {old: commune, new: newCommune}})
        })
      })
    }).catch(e => {
      const message = `Error while updating the region with the ID ${id}`
      res.status(500).json({ message, data: e })
    })
  })
}

export default update