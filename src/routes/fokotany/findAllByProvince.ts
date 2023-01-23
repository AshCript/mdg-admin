import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import { Op } from 'sequelize';
import { Fokotany, Commune, District, Region, Province } from '../../db/sequelize';


const findAllByProvince = (app: Express) => {
  app.get('/api/fokotanys/p/:provinceId', (req: Request, res: Response) => {
    const provinceId = req.params.provinceId
    const name = req.query.name ? `%${req.query.name}%` : `%%`
    const order = req.query.order ? ['ASC', 'DESC'].includes(req.query.order.toString()) ? req.query.order.toString() : 'ASC' : 'ASC'
    const limit = req.query.limit ? parseInt(req.query.limit.toString()) : 20

    Province.findByPk(provinceId).then((province: any) => {
      if(province === null){
        const message = `The province with ID ${provinceId} doesn't exist. Retry with another province ID!`
        return res.status(404).json({ message })
      }
      Region.findAll({where: {provinceId}}).then(async (regions: any) => {
        var fokotanys = []
        var nbFokotanys = 0
        for(let i = 0 ; i < regions.length ; i++){
          const districts: any = await District.findAll({
            where: {regionId: regions[i].id},
            order: [['name', 'ASC']]
          })
          if(districts.length === 0){
            continue
          }
          const fs = []
          for(let j = 0 ; j < districts.length; j++){
            const communes: any = await Commune.findAll({
              where: {districtId: districts[j].id},
              order: [['name', 'ASC']]
            })
            if(communes.length === 0) continue
            for(let k = 0 ; k < communes.length ; k++){
              const fss = await Fokotany.findAndCountAll({
                where: {
                  communeId: communes[k].id,
                  name: {
                    [Op.like]: name
                  }
                },
                order: [['name', order]],
                limit
              })
              if(fss.count === 0) continue
              nbFokotanys += fss.count
              fs.push(...fss.rows)
            }
          }
          if(fs.length === 0) continue
          fokotanys.push({region: regions[i], fokotanys: fs.splice(0, limit)})
        }
        return {fokotanys, nbFokotanys, regions}
      }).then(({fokotanys, nbFokotanys, regions}) => {
        const found = `${nbFokotanys} ${nbFokotanys === 1 ? 'fokotany' : 'fokotanys'} found in ${regions.length === 1 ? 'region' : 'regions'} of the province ${province.name}.`
        const message = `${nbFokotanys === 0 ? found : 'All fokotanys for province ' + province.name + ' have been loaded! ' + found}`
        res.json({ message, data: fokotanys })
      })
    })
  })
}

export default findAllByProvince