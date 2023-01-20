import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import { District } from '../../db/sequelize';


const update = (app: Express) => {
  app.put('/api/district/:id', (req: Request, res: Response) => {
    const id = req.params.id
    District.findByPk(id).then((district: any): any => {
      if(district === null){
        const message = `Impossible to update district with ID ${id}. It doesn't exist`
        return res.status(404).json({ message })
      }

      return District.update(req.body, {
        where: {id}
      }).then(_ => {
        return District.findByPk(id).then((newDistrict: any) => {
          const message = `District with ID ${newDistrict.id} updated successfully!`
          res.json({ message, data: {old: district, new: newDistrict}})
        })
      })
    }).catch(e => {
      const message = `Error while updating the district with the ID ${id}`
      res.status(500).json({ message, data: e })
    })
  })
}

export default update