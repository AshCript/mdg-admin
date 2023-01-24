import { Request, Response } from 'express'
import { Express } from 'express-serve-static-core'
import auth from '../../auth/auth'
import { Province, Region, District, Commune } from '../../db/sequelize'

const remove = (app: Express) => {
  app.delete('/api/province/:id', auth(['admin']), (req: Request, res: Response) => {
    const id = req.params.id
    Province.findByPk(id).then((province: any): any => {
      if(province === null){
        const message = `Province with id ${id} NOT FOUND!`
        return res.status(404).json({ message })
      }

      // Delete all relations linked to the province ID that we want to delete
      Region.findAll({
        where: {provinceId: province.id}
      }).then(regions => {
        regions.map(async (region: any) => {
          const regionDestroy = Region.destroy({where: {id: region.id}})
          District.findAll({
            where: {regionId: region.id}
          }).then(districts => {
            districts.map(async (district: any) => {
              const districtDestroy = District.destroy({where: {id: district.id}})
              Commune.findAll({
                where: {districtId: district.id}
              }).then(communes => {
                communes.map(async (commune: any) => {
                  const communeDestroy = await Commune.destroy({where: {id: commune.id}})
                })
              })
            })
          })
        })
      })

      // Delete the province with the ID
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