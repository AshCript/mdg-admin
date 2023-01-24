import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import { ValidationError, UniqueConstraintError } from 'sequelize';
import auth from '../../auth/auth';
import { Region } from '../../db/sequelize';


const update = (app: Express) => {
  app.put('/api/region/:id', auth(['admin']), (req: Request, res: Response) => {
    const id = req.params.id
    Region.findByPk(id).then((region: any): any => {
      if(region === null){
        const message = `Impossible to update region with ID ${id}. It doesn't exist`
        return res.status(404).json({ message })
      }

      return Region.update(req.body, {
        where: {id}
      }).then(_ => {
        return Region.findByPk(id).then((newRegion: any) => {
          const message = `Region with ID ${newRegion.id} updated successfully!`
          res.json({ message, data: {old: region, new: newRegion}})
        })
      })
    }).catch(e => {
      if(e instanceof ValidationError || e instanceof UniqueConstraintError){
        return res.status(400).json({ message: e.message, data: e})
      }
      const message = `Error while updating the region with the ID ${id}`
      res.status(500).json({ message, data: e })
    })
  })
}

export default update