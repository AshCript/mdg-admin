import { Express } from 'express-serve-static-core'
import { Request, Response } from 'express';
import data from '../../db/mock/mock-district';
import { District } from '../../db/sequelize';

const init = (app: Express) => {
  app.get('/api/districts/init', async (req: Request, res: Response) => {
    for(let i = 0 ; i < data.length ; i++){
      try{
        const district: any = await District.create(data[i])
        console.log(`[ADDED] id: ${district.id}, name: ${district.name}, district: ${district.districtId}`)
      }catch(e){
        console.log(`[ERROR] ${e}`)
      }
    }

    const message = `All district data are initialized!`
    res.json({message})
  })
}

export default init