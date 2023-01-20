import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import { District, Province, Region } from '../../db/sequelize';


const findAllByProvince = (app: Express) => {
  app.get('/api/districts/p/:provinceId', (req: Request, res: Response) => {
    const provinceId = req.params.provinceId
    Province.findByPk(provinceId).then((province: any) => {
      if(province === null){
        const message = `The province's foreign key with ID ${provinceId} doesn't exist. Retry with another region ID!`
        return res.status(404).json({ message })
      }
      Region.findAll({where: {
        provinceId
      }}).then(async (regions: any) => {
        var districts = []
        for(let i = 0 ; i < regions.length ; i++){
          const ds = await District.findAll({
            where: {
              regionId: regions[i].id
            },
            order: ['id', 'ASC']
          })
          districts.push(...ds)
        }
        return districts
      }).then(districts => {
        const found = `${districts.length} ${districts.length === 1 ? 'district' : 'districts'} found.`
        const message = `${districts.length === 0 ? found : 'All districts for province ' + province.name + ' have been loaded! ' + found}`
        res.json({ message, data: districts })
      })
    })
  })
}

export default findAllByProvince