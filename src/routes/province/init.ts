import { Express } from 'express-serve-static-core'
import { Request, Response } from 'express';
import provinceData from '../../db/mock/mock-province';
import { Province } from '../../db/sequelize';

const init = (app: Express) => {
  app.get('/api/provinces/init', (req: Request, res: Response) => {
    provinceData.map((province): any => {
      Province.create(province).then((p:any) => {
        console.log(`[ADDED] id: ${p.id}, name: ${p.name}`)
      }).catch(e => {
        console.log(`[ERROR] ${e}`)
      })
    })
    const message = `Province data initialization DONE!`
    res.json({message})
  })
}

export default init