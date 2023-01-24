import { Express } from 'express-serve-static-core';
import { Request, Response } from 'express'
import { Commune, District } from '../../db/sequelize';
import auth from '../../auth/auth';

const remove = (app: Express) => {
  app.delete('/api/commune/:id', auth(['admin']), (req: Request, res: Response) => {
    const id = req.params.id
    Commune.findByPk(id).then((commune: any): any => {
      if(commune === null){
        const message = `The commune with ID ${id} doesn't exist. Try with another ID!`
        return res.status(404).json({ message })
      }
      return District.findByPk(commune.districtId).then((district: any) => {
        return Commune.destroy({where: {id: commune.id}}).then(_ => {
          const message = `The commune ${commune.name} with ID ${id} which belongs to ${district !== null ? 'district ' + district.name + ' ' : 'no district'} has been deleted!`
          res.json({ message, data: commune })
        })
      })
    }).catch(e => {
      const message = "Something went wrong! Retry later."
      res.status(500).json({ message, data: e })
    })
  })
}

export default remove