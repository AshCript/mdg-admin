import { Express } from 'express-serve-static-core'
import { Request, Response } from 'express';
import provinceData from '../db/mock/mock-province';
import regionData from '../db/mock/mock-region';
import districtData from '../db/mock/mock-district'
import communeData from '../db/mock/mock-commune'
import fokotanyData from '../db/mock/mock-fokotany'
import { Commune, District, Fokotany, Province, Region } from '../db/sequelize';
import auth from '../auth/auth';

const mdgAdminInit = (app: Express) => {
  app.get('/api/mdg-admin/init', auth(['admin']), async (req: Request, res: Response) => {
    // Province data initialization
    for(let i = 0 ; i < provinceData.length ; i++){
      try{
        const province: any = await Province.create(provinceData[i])
        // console.log(`[ADDED] id: ${province.id}, name: ${province.name}, district: ${province.districtId}`)
      }catch(e){
        console.log(`[ERROR] ${e}`)
      }
    }

    // Region data initialization
    for(let i = 0 ; i < regionData.length ; i++){
      try{
        const fokotany: any = await Region.create(regionData[i])
        // console.log(`[ADDED] id: ${fokotany.id}, name: ${fokotany.name}, district: ${fokotany.districtId}`)
      }catch(e){
        console.log(`[ERROR] ${e}`)
      }
    }

    // District data initialization
    for(let i = 0 ; i < districtData.length ; i++){
      try{
        const district: any = await District.create(districtData[i])
        // console.log(`[ADDED] id: ${district.id}, name: ${district.name}, district: ${district.districtId}`)
      }catch(e){
        console.log(`[ERROR] ${e}`)
      }
    }
    
    // Commune data initialization
    for(let i = 0 ; i < communeData.length ; i++){
      try{
        const commune: any = await Commune.create(communeData[i])
        // console.log(`[ADDED] id: ${commune.id}, name: ${commune.name}, district: ${commune.districtId}`)
      }catch(e){
        console.log(`[ERROR] ${e}`)
      }
    }

    // Fokotany data initialization
    for(let i = 0 ; i < fokotanyData.length ; i++){
      try{
        const fokotany: any = await Fokotany.create(fokotanyData[i])
        // console.log(`[ADDED] id: ${fokotany.id}, name: ${fokotany.name}, district: ${fokotany.districtId}`)
      }catch(e){
        console.log(`[ERROR] ${e}`)
      }
    }

    const message = `mdg-admin data initialization DONE!`
    res.json({message})
  })
}

export default mdgAdminInit