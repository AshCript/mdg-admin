import { Request, Response } from 'express'
import { Express } from 'express-serve-static-core'
import { Op } from 'sequelize'
import { Region } from '../../db/sequelize'

const findAll = (app: Express) => {
  app.get('/api/regions', (req: Request, res: Response) => {
    const name = req.query.name ? `%${req.query.name}%` : `%%`
    const order = req.query.order ? req.query.order.toString() : 'ASC'
    const limit = req.query.limit ? parseInt(req.query.limit.toString()) : 5

    Region.findAndCountAll({
      where: {
        name: {
          [Op.like]: name
        }
      },
      order: [['name', order]],
      limit
    }).then(({count, rows}) => {
      const found = `${count} ${count === 1 ? 'region':'regions'} has been found!`
      const message = `${count === 0 ? found : "All regions data has been loaded successfully! " + found}`
      res.json({ message, data: rows })
    }).catch(e => {
      const message = "Something went wrong! Retry later."
      res.status(500).json({ message })
    })
  })
}

export default findAll