import { Express } from 'express-serve-static-core'
import { Request, Response } from 'express';
import regionData from '../../db/mock/mock-region';
import { Region } from '../../db/sequelize';

const init = (app: Express) => {
  app.get('/api/regions/init', (req: Request, res: Response) => {
    regionData.map((region): any => {
      Region.create(region).then((region:any) => {
        console.log(`[ADDED] id: ${region.id}, name: ${region.name}, provinceId: ${region.provinceId}`)
      }).catch(e => {
        console.log(`[ERROR] ${e}`)
      })
    })
    const message = `All region data are initialized!`
    res.json({message})
  })
}

export default init