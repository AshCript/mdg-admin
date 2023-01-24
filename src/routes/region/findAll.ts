import { Request, Response } from 'express'
import { Express } from 'express-serve-static-core'
import { Op } from 'sequelize'
import auth from '../../auth/auth'
import { Region } from '../../db/sequelize'

const findAll = (app: Express) => {
  app.get('/api/regions', auth(['anon', 'user', 'admin']), (req: Request, res: Response) => {
    const name = req.query.name ? `%${req.query.name}%` : `%%`
    const order = req.query.order ? req.query.order.toString() : 'ASC'
    const limit = req.query.limit ? parseInt(req.query.limit.toString()) : 20

    if(req.query.name && req.query.name.length < 4){
      const message = "Use name length greater than 3"
      return res.status(400).json({message})
    }

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