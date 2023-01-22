import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import { Fokotany, Commune, District } from '../../db/sequelize';


const findAllByCommune = (app: Express) => {
  app.get('/api/fokotanys/:communeId', (req: Request, res: Response) => {
    const communeId = req.params.communeId
    Commune.findByPk(communeId).then((commune: any): any => {
      if(commune === null){
        const message = `The commune's foreign key with ID ${communeId} doesn't exist. Retry with another commune ID!`
        return res.status(404).json({ message })
      }
      return Fokotany.findAll({
        where: {communeId},
        order: [['id', 'ASC']]
      }).then(fokotany => {
        const found = `${fokotany.length} ${fokotany.length === 1 ? 'district' : 'fokotany'} found.`
        const message = `${fokotany.length === 0 ? found : 'All fokotany for commune ' + commune.name + ' have been loaded! ' + found}`
        res.json({ message, data: fokotany })
      })
    }).catch(e => {
      const message = "Something went wrong. Retry later!"
      res.status(500).json({ message, data: e })
    })
  })
}

export default findAllByCommune