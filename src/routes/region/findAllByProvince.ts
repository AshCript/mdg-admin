import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import { Province, Region } from '../../db/sequelize';


const findAllByProvince = (app: Express) => {
  app.get('/api/regions/:provinceId', (req: Request, res: Response) => {
    const provinceId = req.params.provinceId
    Province.findByPk(provinceId).then((province: any) => {
      if(province === null){
        const message = `The ID ${provinceId} doesn't exist. Try with another province ID.`
        return res.status(404).json({ message })
      }
      return Region.findAll({
        where: { provinceId: province.id }
      }).then(regions => {
        if(regions.length === 0) {
          const message = `No regions has been found for province ${province.name} with ID ${province.id}`
          return res.status(404).json({ message, data: regions })
        }
        const message = `${regions.length} ${regions.length > 1 ? 'regions' : 'region'} has been found!`
        res.json({ message, data: regions })
      })
    }).catch(e => {
      const message = "Something went wrong! Retry later."
      res.status(500).json({ message, data: e })
    })
  })
}

export default findAllByProvince