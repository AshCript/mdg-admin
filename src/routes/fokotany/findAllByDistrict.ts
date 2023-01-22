import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import { Fokotany, Commune, District, Region } from '../../db/sequelize';


const findAllByDistrict = (app: Express) => {
  app.get('/api/fokotanys/d/:districtId', (req: Request, res: Response) => {
    const districtId = req.params.districtId
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
            where: {communeId: communes[i].id},
            order: [['id', 'ASC']]
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