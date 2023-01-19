import { Express } from 'express-serve-static-core'
import { Province } from '../../db/sequelize'

const findById = (app: Express) => {
  app.get('/api/province/:id', (req, res) => {
    const id = req.params.id
    Province.findByPk(id).then((province: any): any => {
      if(province === null){
        const message = `Province with id ${id} NOT FOUND!`
        return res.status(404).json({message})
      }
      const message = `A province with id ${id} has been found!`
      res.json({message, data: province})
    }).catch(e => {
      const message = `Server error! Try again later!`
      res.status(500).json({message, data: e})
    })
  })
}

export default findById