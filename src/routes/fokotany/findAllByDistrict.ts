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
          const fs = await Fokotany.findAll({
            where: {
              name: {
                [Op.like]: name
              }
            },
            order: [['name', order]],
            limit
          })
          fokotanys.push(...fs)
        }
        return fokotanys
      }).then(fokotanys => {
        const found = `${fokotanys.length} ${fokotanys.length === 1 ? 'district' : 'fokotanys'} found.`
        const message = `${fokotanys.length === 0 ? found : 'All fokotanys for district ' + district.name + ' have been loaded! ' + found}`
        res.json({ message, data: fokotanys })
      })
    })
  })
}

export default findAllByDistrict