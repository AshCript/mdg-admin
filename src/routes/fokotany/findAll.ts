import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import { Op } from 'sequelize';
import { Fokotany } from '../../db/sequelize';


const findAll = (app: Express) => {
  app.get('/api/fokotanys', (req: Request, res: Response) => {
    const order = req.query.order ? ['ASC', 'DESC'].includes(req.query.order.toString()) ? req.query.order.toString() : 'ASC' : 'ASC'
    const limit = req.query.limit ? parseInt(req.query.limit.toString()) : 20
    if(req.query.name){
      const name = req.query.name ? `%${req.query.name}%` : `%%`
      return Fokotany.findAndCountAll({
        where: {
          name: {
            [Op.like]: name
          }
        },
        order: [['name', order]],
        limit
      }).then(({count, rows}) => {
        const fokotanys = [...rows]
        const found = `${count} ${count === 1 ? 'fokotany':'fokotanys'} has been found!`
        const message = `${count === 0 ? found : "All  fokotanys data (" + count + ") has been loaded successfully! " + found}`
        res.json({ message, data: fokotanys })
      })
    }

    Fokotany.findAndCountAll({
      order: [['name', order]],
      limit
    }).then(({count, rows}) => {
      const found = `${count} ${count === 1 ? 'fokotany' : 'fokotanys'} found!`
      const message = `${count === 0 ? found : "All fokotanys data have been loaded successfully! " + found }`
      res.json({ message, data: rows })
    }).catch(e => {
      const message = "Impossible to load all fokotany. Retry later!"
      res.status(500).json({ message, data: e })
    })
  })
}

export default findAll