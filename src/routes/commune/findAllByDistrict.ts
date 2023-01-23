import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import { Op } from 'sequelize';
import { Commune, District } from '../../db/sequelize';


const findAllByDistrict = (app: Express) => {
  app.get('/api/communes/:districtId', (req: Request, res: Response) => {
    const districtId = req.params.districtId
    const name = req.query.name ? `%${req.query.name}%` : `%%`
    const order = req.query.order ? ['ASC', 'DESC'].includes(req.query.order.toString()) ? req.query.order.toString() : 'ASC' : 'ASC'
    const limit = req.query.limit ? parseInt(req.query.limit.toString()) : 20

    if(req.query.name && req.query.name.length < 4){
      const message = "Use name length greater than 3"
      return res.status(400).json({message})
    }

    District.findByPk(districtId).then((district: any): any => {
      if(district === null){
        const message = `The district's foreign key with ID ${districtId} doesn't exist. Retry with another district ID!`
        return res.status(404).json({ message })
      }
      return Commune.findAndCountAll({
        where: {
          districtId,
          name: {
            [Op.like]: name
          }
        },
        order: [['name', order]],
        limit
      }).then(({count, rows}) => {
        const found = `${count} ${count === 1 ? 'commune' : 'communes'} found.`
        const message = `${count === 0 ? found : 'All communes data for district ' + district.name + ' have been loaded! ' + found}`
        res.json({ message, data: rows })
      })
    }).catch(e => {
      const message = "Something went wrong. Retry later!"
      res.status(500).json({ message, data: e })
    })
  })
}

export default findAllByDistrict