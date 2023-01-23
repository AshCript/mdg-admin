import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import { Op } from 'sequelize';
import { Fokotany, Commune, District, Region } from '../../db/sequelize';


const findAllByDistrict = (app: Express) => {
  app.get('/api/fokotanys/d/:districtId', (req: Request, res: Response) => {
    const districtId = req.params.districtId
    const name = req.query.name ? `%${req.query.name}%` : `%%`
    const order = req.query.order ? ['ASC', 'DESC'].includes(req.query.order.toString()) ? req.query.order.toString() : 'ASC' : 'ASC'
    const limit = req.query.limit ? parseInt(req.query.limit.toString()) : 20

    if(req.query.name && req.query.name.length < 4){
      const message = "Use name length greater than 3"
      return res.status(400).json({message})
    }
    
    District.findByPk(districtId).then((district: any) => {
      if(district === null){
        const message = `The district's foreign key with ID ${districtId} doesn't exist. Retry with another district ID!`
        return res.status(404).json({ message })
      }
      Commune.findAll({where: {
        districtId
      }}).then(async (communes: any) => {
        var fokotanys = []
        for(let i = 0 ; i < communes.length ; i++){
          const fs = await Fokotany.findAndCountAll({
            where: {
              name: {
                [Op.like]: name
              }
            },
            order: [['name', order]]
          })
          fokotanys.push(...fs.rows)
        }
        return (fokotanys)
      }).then(fokotanys => {
        const found = `${fokotanys.length} ${fokotanys.length === 1 ? 'district' : 'fokotanys'} found.`
        const message = `${fokotanys.length === 0 ? found : 'All fokotanys for district ' + district.name + ' have been loaded! ' + found}`
        res.json({ message, data: fokotanys.splice(0, limit).sort() })
      })
    })
  })
}

export default findAllByDistrict