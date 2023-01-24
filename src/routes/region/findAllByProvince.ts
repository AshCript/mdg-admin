import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import { Op } from 'sequelize';
import auth from '../../auth/auth';
import { Province, Region } from '../../db/sequelize';


const findAllByProvince = (app: Express) => {
  app.get('/api/regions/:provinceId', auth(['anon', 'user', 'admin']), (req: Request, res: Response) => {
    const provinceId = req.params.provinceId
    const name = req.query.name ? `%${req.query.name}%` : `%%`
    const order = req.query.order ? ['ASC', 'DESC'].includes(req.query.order.toString()) ? req.query.order.toString() : 'ASC' : 'ASC'
    const limit = req.query.limit ? parseInt(req.query.limit.toString()) : 20

    if(req.query.name && req.query.name.length < 4){
      const message = "Use name length greater than 3"
      return res.status(400).json({message})
    }

    Province.findByPk(provinceId).then((province: any) => {
      if(province === null){
        const message = `The ID ${provinceId} doesn't exist. Try with another province ID.`
        return res.status(404).json({ message })
      }
      return Region.findAndCountAll({
        where: {
          provinceId: province.id,
          name: {
            [Op.like]: name
          }
        },
        order: [['name', order]],
        limit
      }).then(({count, rows}) => {
        if(count === 0) {
          const message = `No regions has been found for province ${province.name} with ID ${province.id}`
          return res.status(404).json({ message, data: rows })
        }
        const message = `${count} ${count === 1 ? 'region' : 'regions'} has been found!`
        res.json({ message, data: rows })
      })
    }).catch(e => {
      const message = "Something went wrong! Retry later."
      res.status(500).json({ message, data: e })
    })
  })
}

export default findAllByProvince