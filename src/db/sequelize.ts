import { Sequelize, DataTypes} from 'sequelize'
import ProvinceModel from '../models/province';

const sequelize = new Sequelize(
  'db_mdg_admin',
  'pguser',
  'root',
  {
    host: "localhost",
    dialect: "postgres",
    dialectOptions: {
      timezone: "Etc/GMT+3"
    },
    logging: false
  }
)

sequelize.authenticate().then(_ => {
  console.log("[SUCCESS] Database authentication established!")
}).catch(e => {
  console.log(`[ERROR] Database authentication error : ${e}`)
})

const Province = ProvinceModel(sequelize, DataTypes)

const initDb = () => {
  sequelize.sync({force: true}).then(_ => {
    console.log("[SUCCESS] Database connection synchronized!")
  }).catch(e => {
    console.log(`[ERROR] Database connection not synchronized : ${e}`)
  })
}

export {
  initDb,
  Province
}