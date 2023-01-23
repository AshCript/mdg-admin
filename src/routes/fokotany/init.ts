import { Express } from 'express-serve-static-core'
import { Request, Response } from 'express';
import data from '../../db/mock/mock-fokotany';
import { Fokotany } from '../../db/sequelize';

const init = (app: Express) => {
  app.get('/api/fokotanys/init', async (req: Request, res: Response) => {
    for(let i = 0 ; i < data.length ; i++){
      try{
        const fokotany: any = await Fokotany.create(data[i])
        console.log(`[ADDED] id: ${fokotany.id}, name: ${fokotany.name}, district: ${fokotany.districtId}`)
      }catch(e){
        console.log(`[ERROR] ${e}`)
      }
    }
    const message = `All fokotany data are initialized!`
    res.json({message})
  })
}

export default init