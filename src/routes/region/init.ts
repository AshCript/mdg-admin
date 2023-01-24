import { Express } from 'express-serve-static-core'
import { Request, Response } from 'express';
import data from '../../db/mock/mock-region';
import { Region } from '../../db/sequelize';
import auth from '../../auth/auth';

const init = (app: Express) => {
  app.get('/api/regions/init', auth(['admin']), async (req: Request, res: Response) => {
    for(let i = 0 ; i < data.length ; i++){
      try{
        const fokotany: any = await Region.create(data[i])
        console.log(`[ADDED] id: ${fokotany.id}, name: ${fokotany.name}, district: ${fokotany.districtId}`)
      }catch(e){
        console.log(`[ERROR] ${e}`)
      }
    }
    const message = `All region data are initialized!`
    res.json({message})
  })
}

export default init