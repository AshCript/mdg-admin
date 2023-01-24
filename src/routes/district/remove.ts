import { Express } from 'express-serve-static-core';
import { Request, Response } from 'express'
import { District, Region } from '../../db/sequelize';
import auth from '../../auth/auth';

const remove = (app: Express) => {
  app.delete('/api/district/:id', auth(['admin']), (req: Request, res: Response) => {
    const id = req.params.id
    District.findByPk(id).then((district: any): any => {
      if(district === null){
        const message = `The district with ID ${id} doesn't exist. Try with another ID!`
        return res.status(404).json({ message })
      }
      return Region.findByPk(district.regionId).then((region: any) => {
        return District.destroy({where: {id: district.id}}).then(_ => {
          const message = `The district ${district.name} with ID ${id} which belongs to ${region !== null ? 'region ' + region.name + ' ' : 'no region'} has been deleted!`
          res.json({ message, data: district })
        })
      })
    }).catch(e => {
      const message = "Something went wrong! Retry later."
      res.status(500).json({ message, data: e })
    })
  })
}

export default remove