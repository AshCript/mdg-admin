import { Request, Response } from 'express'
import { Express } from 'express-serve-static-core'
import { Op } from 'sequelize'
import { Province } from '../../db/sequelize'

const findAll = (app: Express) => {
  app.get('/api/provinces', (req: Request, res: Response) => {
    const name = req.query.name ? `%${req.query.name}%` : `%%`
    const order = req.query.order ? ['ASC', 'DESC'].includes(req.query.order.toString()) ? req.query.order.toString() : 'ASC' : 'ASC'
    const limit = req.query.limit ? parseInt(req.query.limit.toString()) : 20

    Province.findAndCountAll({
      where: {
        name: {
          [Op.like]: name
        }
      },
      order: [['name', order]],
      limit
    }).then(({count, rows}) => {
      const found = `${count} ${count === 1 ? 'province' : 'provinces'} found!`
      const message = `${count === 0 ? found : "All province data have been loaded successfully! " + found}`
      res.json({message, data: rows})
    }).catch(e => {
      const message = "Impossible to load all province data. Retry later!"
      res.status(500).json({message, data: e})
    })
  })
}

export default findAll