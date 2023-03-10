import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import { Op } from 'sequelize';
import auth from '../../auth/auth';
import { District } from '../../db/sequelize';


const findAll = (app: Express) => {
  app.get('/api/districts', auth(['anon', 'user', 'admin']), (req: Request, res: Response) => {
    const name = req.query.name ? `%${req.query.name}%` : `%%`
    const order = req.query.order ? ['ASC', 'DESC'].includes(req.query.order.toString()) ? req.query.order.toString() : 'ASC' : 'ASC'
    const limit = req.query.limit ? parseInt(req.query.limit.toString()) : 20

    if(req.query.name && req.query.name.length < 4){
      const message = "Use name length greater than 3"
      return res.status(400).json({message})
    }

    District.findAndCountAll({
      where: {
        name: {
          [Op.like]: name
        }
      },
      order: [['name', order]],
      limit
    }).then(({count, rows}) => {
      const districts = [...rows]
      const found = `${count} ${count === 1 ? 'district' : 'districts'} found!`
      const message = `${count === 0 ? found : "All districts data have been loaded successfully! " + found }`
      res.json({ message, data: districts })
    }).catch(e => {
      const message = "Impossible to load all districts. Retry later!"
      res.status(500).json({ message, data: e })
    })
  })
}

export default findAll