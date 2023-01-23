import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import { Op } from 'sequelize';
import { Fokotany, Commune, District, Region, Province } from '../../db/sequelize';


const findAllByRegion = (app: Express) => {
  app.get('/api/fokotanys/r/:regionId', (req: Request, res: Response) => {
    const regionId = req.params.regionId
    const name = req.query.name ? `%${req.query.name}%` : `%%`
    const order = req.query.order ? ['ASC', 'DESC'].includes(req.query.order.toString()) ? req.query.order.toString() : 'ASC' : 'ASC'
    const limit = req.query.limit ? parseInt(req.query.limit.toString()) : 20

    Region.findByPk(regionId).then((region: any) => {
      if(region === null){
        const message = `The region with ID ${regionId} doesn't exist. Retry with another region ID!`
        return res.status(404).json({ message })
      }
      District.findAndCountAll({where: {regionId}}).then(async ({count, rows}) => {
        var communes = []
        const districts: any = rows
        for(let i = 0 ; i < districts.length ; i++){
          const cs = await Commune.findAll({
            where: {regionId: districts[i].id},
            order: [['id', 'ASC']]
          })
          communes.push({district: districts[i], communes: cs})
        }
        const nbDistricts = count
        return {nbDistricts, communes}
      }).then(async ({nbDistricts, communes}) => {
        var fokotanys = []
        var nbFokotanys = 0
        for(let i = 0 ; i < communes.length ; i++){
          var fs = []
          for(let j = 0 ; j < communes[i].communes.length ; j++){
            const fss = await Fokotany.findAll({
              where: {
                communeId: communes[i].communes[j].id,
                name: {
                  [Op.like]: name
                }
              },
              order: [['name', order]],
              limit
            })
            nbFokotanys += fss.length
            fs.push(...fss)
          }
          fokotanys.push({commune: communes[i].region , fokotanys: fs})
        }
        return {nbDistricts, fokotanys, nbFokotanys}
      }).then(({nbDistricts, fokotanys, nbFokotanys}) => {
        const found = `${nbFokotanys} ${nbFokotanys === 1 ? 'fokotany' : 'fokotanys'} found in ${nbDistricts} districts.`
        const message = `${nbFokotanys === 0 ? found : 'All fokotanys for region ' + region.name + ' have been loaded! ' + found}`
        res.json({ message, data: fokotanys })
      })
    })
  })
}

export default findAllByRegion