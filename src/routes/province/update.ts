import { Express } from 'express-serve-static-core'
import { ValidationError, UniqueConstraintError } from 'sequelize'
import { Province } from '../../db/sequelize'

const update = (app: Express) => {
  app.put('/api/province/:id', (req, res) => {
    const id = req.params.id
    Province.update(req.body, {
      where: {id}
    }).then(_ => {
      return Province.findByPk(id).then((province: any) => {
        const message = `The province with id ${province.id} is updated successfully!`
        res.json({ message, data: province})
      })
    }).catch(e => {
      if(e instanceof ValidationError || e instanceof UniqueConstraintError){
        return res.status(400).json({ message: e.message, data: e})
      }
      const message = `Error while updating province with id ${id}`
      res.status(500).json({ message, data: e })
    })
  })
}

export default update