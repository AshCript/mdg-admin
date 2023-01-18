import { Express } from 'express-serve-static-core'
import { Province } from '../../db/sequelize'

const update = (app: Express) => {
  app.put("/api/province/:id", (req, res) => {
    const id = req.params.id
    Province.update(req.body, {
      where: {id: id}
    }).then(_ => {
      return Province.findByPk(id).then(p => {
        const province:any = p
        const message = `The province with id ${province.id} is updated successfully!`
        res.json({ message, data: p})
      })
    }).catch(e => {
      const message = `Error while updating province with id ${id}`
      res.status(500).json({ message, data: e })
    })
  })
}

export default update