import { Request, Response } from 'express'
import { Express } from 'express-serve-static-core'
import { Province } from '../../db/sequelize'

const remove = (app: Express) => {
  app.delete('/api/province/:id', (req: Request, res: Response) => {
    const id = req.params.id
    Province.findByPk(id).then((province: any): any => {
      if(province === null){
        const message = `Province with id ${id} NOT FOUND!`
        return res.status(404).json({ message })
      }
      return Province.destroy({where: {id: province.id}}).then(_ => {
        const message = `Province with id ${province.id} deleted successfully!`
        res.json({message, data: province})
      })
    }).catch(e => {
      const message = `Impossible to delete province. Retry later!`
      res.status(500).json({message, data: e})
    })
  })
}

export default remove