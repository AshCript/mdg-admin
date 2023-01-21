import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import { Commune, District, Region } from '../../db/sequelize';


const findAllByRegion = (app: Express) => {
  app.get('/api/communes/r/:regionId', (req: Request, res: Response) => {
    const regionId = req.params.regionId
    Region.findByPk(regionId).then((region: any) => {
      if(region === null){
        const message = `The region's foreign key with ID ${regionId} doesn't exist. Retry with another region ID!`
        return res.status(404).json({ message })
      }
      District.findAll({where: {
        regionId
      }}).then(async (districts: any) => {
        var communes = []
        for(let i = 0 ; i < districts.length ; i++){
          const cs = await Commune.findAll({
            where: {districtId: districts[i].id},
            order: [['id', 'ASC']]
          })
          communes.push(...cs)
        }
        return communes
      }).then(communes => {
        const found = `${communes.length} ${communes.length === 1 ? 'district' : 'communes'} found.`
        const message = `${communes.length === 0 ? found : 'All communes for region ' + region.name + ' have been loaded! ' + found}`
        res.json({ message, data: communes })
      })
    })
  })
}

export default findAllByRegion