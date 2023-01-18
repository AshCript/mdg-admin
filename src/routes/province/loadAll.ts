import { Express } from 'express-serve-static-core'
import { Request, Response } from 'express';
import provinces from '../../db/mock-province';
import { Province } from '../../db/sequelize';

const provinceData = provinces
const loadAll = (app: Express) => {
  app.get("/api/provinces/load", (req: Request, res: Response) => {
    provinceData.map((p): any => {
      Province.create(p).then(p2 => {
        const province:any = p2
        console.log(`[ADDED] id: ${province.id}, name: ${province.name}`)
      }).catch(e => {
        console.log(`[ERROR] ${e}`)
      })
    })
    const message = `All province data is initialized!`
    res.json({message})
  })
}

export default loadAll