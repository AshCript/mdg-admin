import { Express } from 'express-serve-static-core'
import { Request, Response } from 'express';
import provinces from '../../db/mock/mock-province';
import { Province } from '../../db/sequelize';

const provinceData = provinces
const init = (app: Express) => {
  app.get('/api/provinces/init', (req: Request, res: Response) => {
    provinceData.map((province): any => {
      Province.create(province).then((p:any) => {
        console.log(`[ADDED] id: ${p.id}, name: ${p.name}`)
      }).catch(e => {
        console.log(`[ERROR] ${e}`)
      })
    })
    const message = `All province data is initialized!`
    res.json({message})
  })
}

export default init