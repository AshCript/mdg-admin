import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import { Op } from 'sequelize';
import { District, Region } from '../../db/sequelize';


const findAllByRegion = (app: Express) => {
  app.get('/api/districts/:regionId', (req: Request, res: Response) => {
    const regionId = req.params.regionId
    const name = req.query.name ? `%${req.query.name}%` : `%%`
    const order = req.query.order ? ['ASC', 'DESC'].includes(req.query.order.toString()) ? req.query.order.toString() : 'ASC' : 'ASC'
    const limit = req.query.limit ? parseInt(req.query.limit.toString()) : 20

    Region.findByPk(regionId).then((region: any): any => {
      if(region === null){
        const message = `The regions's foreign key with ID ${regionId} doesn't exist. Retry with another region ID!`
        return res.status(404).json({ message })
      }
      return District.findAndCountAll({
        where: {
          regionId,
          name: {
            [Op.like]: name
          }
        },
        order: [['name', order]],
        limit
      }).then(({count, rows}) => {
        const found = `${count} ${count === 1 ? 'district' : 'districts'} found.`
        const message = `${count === 0 ? found : 'All districts for region ' + region.name + ' have been loaded! ' + found}`
        res.json({ message, data: rows })
      })
    }).catch(e => {
      const message = "Something went wrong. Retry later!"
      res.status(500).json({ message, data: e })
    })
  })
}

export default findAllByRegion