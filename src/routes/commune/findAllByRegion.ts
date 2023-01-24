import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import { Op } from 'sequelize';
import auth from '../../auth/auth';
import { Commune, District, Region } from '../../db/sequelize';


const findAllByRegion = (app: Express) => {
  app.get('/api/communes/r/:regionId', auth(['anon', 'user', 'admin']), (req: Request, res: Response) => {
    const regionId = req.params.regionId
    const name = req.query.name ? `%${req.query.name}%` : `%%`
    const order = req.query.order ? ['ASC', 'DESC'].includes(req.query.order.toString()) ? req.query.order.toString() : 'ASC' : 'ASC'
    const limit = req.query.limit ? parseInt(req.query.limit.toString()) : 20

    if(req.query.name && req.query.name.length < 4){
      const message = "Use name length greater than 3"
      return res.status(400).json({message})
    }
    
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
            where: {
              districtId: districts[i].id,
              name: {
                [Op.like]: name
              }
            },
            order: [['name', order]],
            limit
          })
          communes.push(...cs)
        }
        return communes
      }).then(communes => {
        const found = `${communes.length} ${communes.length === 1 ? 'commune' : 'communes'} found.`
        const message = `${communes.length === 0 ? found : 'All communes for region ' + region.name + ' have been loaded! ' + found}`
        res.json({ message, data: communes })
      })
    })
  })
}

export default findAllByRegion