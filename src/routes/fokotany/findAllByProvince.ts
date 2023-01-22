import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import { Fokotany, Commune, District, Region, Province } from '../../db/sequelize';
import district from '../district';


const findAllByProvince = (app: Express) => {
  app.get('/api/fokotanys/p/:provinceId', (req: Request, res: Response) => {
    const provinceId = req.params.provinceId
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
            order: [['id', 'ASC']]
          })
          if(districts.length === 0){
            continue
          }
          const fs = []
          for(let j = 0 ; j < districts.length; j++){
            const communes: any = await Commune.findAll({
              where: {districtId: districts[j].id},
              order: [['id', 'ASC']]
            })
            if(communes.length === 0) continue
            for(let k = 0 ; k < communes.length ; k++){
              const fss = await Fokotany.findAll({
                where: {communeId: communes[k].id},
                order: [['id', 'ASC']]
              })
              if(fss.length === 0) continue
              nbFokotanys += fss.length
              fs.push(...fss)
            }
          }
          if(fs.length === 0) continue
          fokotanys.push({region: regions[i], fokotanys: fs})
        }
        return {fokotanys, nbFokotanys, regions}
      }).then(({fokotanys, nbFokotanys, regions}) => {
        const found = `${nbFokotanys} ${nbFokotanys === 1 ? 'fokotany' : 'fokotanys'} found in ${fokotanys.length === 1 /** It returns then the number of regions */ ? 'region' : 'regions'} of the province ${province.name}.`
        const message = `${nbFokotanys === 0 ? found : 'All fokotanys for province ' + province.name + ' have been loaded! ' + found}`
        res.json({ message, data: fokotanys })
      })
    })
  })
}

export default findAllByProvince