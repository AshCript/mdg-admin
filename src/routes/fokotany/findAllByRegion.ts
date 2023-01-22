import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import { Fokotany, Commune, District, Region, Province } from '../../db/sequelize';


const findAllByRegion = (app: Express) => {
  app.get('/api/fokotanys/r/:regionId', (req: Request, res: Response) => {
    const regionId = req.params.regionId
    Region.findByPk(regionId).then((region: any) => {
      if(region === null){
        const message = `The region with ID ${regionId} doesn't exist. Retry with another region ID!`
        return res.status(404).json({ message })
      }
      District.findAll({where: {regionId}}).then(async (districts: any) => {
        var communes = []
        for(let i = 0 ; i < districts.length ; i++){
          const cs = await Commune.findAll({
            where: {regionId: districts[i].id},
            order: [['id', 'ASC']]
          })
          communes.push({district: districts[i], communes: cs})
        }
        return communes
      }).then(async (communes: any) => {
        var fokotanys = []
        var nbFokotanys = 0
        for(let i = 0 ; i < communes.length ; i++){
          var fs = []
          for(let j = 0 ; j < communes[i].communes.length ; j++){
            const fss = await Fokotany.findAll({
              where: {communeId: communes[i].communes[j].id},
              order: [['id', 'ASC']]
            })
            nbFokotanys += fss.length
            fs.push(...fss)
          }
          fokotanys.push({commune: communes[i].region , fokotanys: fs})
        }
        return {fokotanys, nbFokotanys}
      }).then(({fokotanys, nbFokotanys}) => {
        const found = `${nbFokotanys} ${nbFokotanys === 1 ? 'commune' : 'communes'} found in ${fokotanys.length /** It returns then the number of districts */} districts.`
        const message = `${nbFokotanys === 0 ? found : 'All fokotanys for region ' + region.name + ' have been loaded! ' + found}`
        res.json({ message, data: fokotanys })
      })
    })
  })
}

export default findAllByRegion