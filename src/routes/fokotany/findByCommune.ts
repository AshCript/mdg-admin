import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import { Op } from 'sequelize';
import auth from '../../auth/auth';
import { Fokotany, Commune } from '../../db/sequelize';


const findAllByCommune = (app: Express) => {
  app.get('/api/fokotanys/:communeId', auth(['anon', 'user', 'admin']), (req: Request, res: Response) => {
    const communeId = req.params.communeId
    const name = req.query.name ? `%${req.query.name}%` : `%%`
    const order = req.query.order ? ['ASC', 'DESC'].includes(req.query.order.toString()) ? req.query.order.toString() : 'ASC' : 'ASC'
    const limit = req.query.limit ? parseInt(req.query.limit.toString()) : 20

    if(req.query.name && req.query.name.length < 4){
      const message = "Use name length greater than 3"
      return res.status(400).json({message})
    }

    Commune.findByPk(communeId).then((commune: any): any => {
      if(commune === null){
        const message = `The commune's foreign key with ID ${communeId} doesn't exist. Retry with another commune ID!`
        return res.status(404).json({ message })
      }
      return Fokotany.findAndCountAll({
        where: {
          communeId,
          name: {
            [Op.like]: name
          }
        },
        order: [['name', order]],
        limit
      }).then(({count, rows}) => {
        const found = `${count} ${count === 1 ? 'fokotany' : 'fokotanys'} found.`
        const message = `${count === 0 ? found : 'All fokotany for commune ' + commune.name + ' have been loaded! ' + found}`
        res.json({ message, data: rows })
      })
    }).catch(e => {
      const message = "Something went wrong. Retry later!"
      res.status(500).json({ message, data: e })
    })
  })
}

export default findAllByCommune