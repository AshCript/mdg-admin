import { Express } from 'express-serve-static-core'
import { Request, Response } from 'express';
import data from '../../db/mock/mock-province';
import { Province } from '../../db/sequelize';

const init = (app: Express) => {
  app.get('/api/provinces/init', async (req: Request, res: Response) => {
    for(let i = 0 ; i < data.length ; i++){
      try{
        const province: any = await Province.create(data[i])
        console.log(`[ADDED] id: ${province.id}, name: ${province.name}, district: ${province.districtId}`)
      }catch(e){
        console.log(`[ERROR] ${e}`)
      }
    }
    const message = `Province data initialization DONE!`
    res.json({message})
  })
}

export default init