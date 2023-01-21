import { Express } from 'express-serve-static-core'
import { Request, Response } from 'express';
import communeData from '../../db/mock/mock-commune';
import { Commune } from '../../db/sequelize';

const init = (app: Express) => {
  app.get('/api/districts/init', async (req: Request, res: Response) => {
    for(let i = 0 ; i < communeData.length ; i++){
      const c = communeData[i]
      try{
        const commune: any = await Commune.create(c)
        console.log(`[ADDED] id: ${commune.id}, name: ${commune.name}, regionId: ${commune.regionId}`)
      }catch(e){
        console.log(`[ERROR] ${e}`)
      }
    }

    const message = `All commune data have been initialized!`
    res.json({message})
  })
}

export default init