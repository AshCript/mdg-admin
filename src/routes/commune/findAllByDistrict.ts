import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import { Commune, District } from '../../db/sequelize';


const findAllByDistrict = (app: Express) => {
  app.get('/api/communes/:districtId', (req: Request, res: Response) => {
    const districtId = req.params.districtId
    District.findByPk(districtId).then((district: any): any => {
      if(district === null){
        const message = `The district's foreign key with ID ${districtId} doesn't exist. Retry with another district ID!`
        return res.status(404).json({ message })
      }
      return Commune.findAll({
        where: {districtId},
        order: [['id', 'ASC']]
      }).then(communes => {
        const found = `${communes.length} ${communes.length === 1 ? 'district' : 'communes'} found.`
        const message = `${communes.length === 0 ? found : 'All communes for region ' + district.name + ' have been loaded! ' + found}`
        res.json({ message, data: communes })
      })
    }).catch(e => {
      const message = "Something went wrong. Retry later!"
      res.status(500).json({ message, data: e })
    })
  })
}

export default findAllByDistrict