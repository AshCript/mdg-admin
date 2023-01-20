import { Express } from 'express-serve-static-core'
import { Request, Response } from 'express';
import districtData from '../../db/mock/mock-district';
import { District } from '../../db/sequelize';

const init = (app: Express) => {
  app.get('/api/regions/init', (req: Request, res: Response) => {
    districtData.map((district): any => {
      District.create(district).then((district:any) => {
        console.log(`[ADDED] id: ${district.id}, name: ${district.name}, provinceId: ${district.regionId}`)
      }).catch(e => {
        console.log(`[ERROR] ${e}`)
      })
    })
    const message = `All district data are initialized!`
    res.json({message})
  })
}

export default init