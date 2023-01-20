import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import { District, Region } from '../../db/sequelize';


const findAllByRegion = (app: Express) => {
  app.get('/api/districts/:regionId', (req: Request, res: Response) => {
    const regionId = req.params.regionId
    Region.findByPk(regionId).then((region: any): any => {
      if(region === null){
        const message = `The regions's foreign key with ID ${regionId} doesn't exist. Retry with another region ID!`
        return res.status(404).json({ message })
      }
      return District.findAll({where: {
        regionId
      }}).then(districts => {
        const found = `${districts.length} ${districts.length === 1 ? 'district' : 'districts'} found.`
        const message = `${districts.length === 0 ? found : 'All districts for region ' + region.name + ' have been loaded! ' + found}`
        res.json({ message, data: districts })
      })
    }).catch(e => {
      const message = "Something went wrong. Retry later!"
      res.status(500).json({ message, data: e })
    })
  })
}

export default findAllByRegion