import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import { Province, Region } from '../../db/sequelize';

const remove = (app: Express) => {
  app.delete('/api/region/:id', (req: Request, res: Response) => {
    const id = req.params.id
    Region.findByPk(id).then((region: any) => {
      if(region === null){
        const message = `The region with ID ${id} doesn't exist. Try with another ID!`
        res.status(404).json({ message })
      }
      return Province.findByPk(region.provinceId).then((province: any) => {
        return Region.destroy({where: {id: region.id}}).then(_ => {
          const message = `The region ${region.name} with ID ${id} which belongs to ${province !== null ? 'province ' + province.name + ' ' : 'no province'} has been deleted!`
          res.json({ message, data: region })
        })
      })
    }).catch(e => {
      const message = "Something went wrong! Retry later."
      res.status(500).json({ message, data: e })
    })
  })
}

export default remove