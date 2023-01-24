import { Express } from 'express-serve-static-core'
import { Request, Response } from 'express';
import data from '../../db/mock/mock-commune';
import { Commune } from '../../db/sequelize';
import auth from '../../auth/auth';

const init = (app: Express) => {
  app.get('/api/commune/init', auth(['admin']), async (req: Request, res: Response) => {
    for(let i = 0 ; i < data.length ; i++){
      try{
        const commune: any = await Commune.create(data[i])
        console.log(`[ADDED] id: ${commune.id}, name: ${commune.name}, district: ${commune.districtId}`)
      }catch(e){
        console.log(`[ERROR] ${e}`)
      }
    }

    const message = `All commune data have been initialized!`
    res.json({message})
  })
}

export default init