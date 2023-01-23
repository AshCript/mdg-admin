import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import { Op } from 'sequelize';
import { Commune, District, Region, Province } from '../../db/sequelize';


const findAllByProvince = (app: Express) => {
  app.get('/api/communes/p/:provinceId', (req: Request, res: Response) => {
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
        const message = `The province with ID ${provinceId} doesn't exist. Retry with another region ID!`
        return res.status(404).json({ message })
      }
      Region.findAll({where: {provinceId}}).then(async (regions: any) => {
        var districts = []
        for(let i = 0 ; i < regions.length ; i++){
          const ds = await District.findAll({
            where: {regionId: regions[i].id},
            order: [['id', 'ASC']]
          })
          if(ds.length === 0){
            continue
          }
          districts.push({region: regions[i], districts: ds})
        }
        return districts
      }).then(async (districts: any) => {
        var communes = []
        var nbCommunes = 0
        for(let i = 0 ; i < districts.length ; i++){
          var cs = []
          for(let j = 0 ; j < districts[i].districts.length ; j++){
            const css = await Commune.findAndCountAll({
              where: {
                districtId: districts[i].districts[j].id,
                name: {
                  [Op.like]: name
                }
              },
              order: [['name', order]],
              limit
            })
            if(css.count === 0){
              continue
            }
            nbCommunes += css.count
            cs.push(...css.rows)
          }
          if(cs.length === 0){
            continue
          }
          communes.push({region: districts[i].region , commmunes: cs})
        }
        return {communes, nbCommunes}
      }).then(({communes, nbCommunes}) => {
        const found = `${nbCommunes} ${nbCommunes === 1 ? 'commune' : 'communes'} found in ${communes.length /** It returns then the number of regions */} regions.`
        const message = `${nbCommunes === 0 ? found : 'All communes for province ' + province.name + ' have been loaded! ' + found}`
        res.json({ message, data: communes })
      })
    })
  })
}

export default findAllByProvince