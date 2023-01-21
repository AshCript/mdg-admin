import { Sequelize, DataTypes} from 'sequelize'
import ProvinceModel from '../models/province';
import RegionModel from '../models/region';
import DistrictModel from '../models/district';
import CommuneModel from '../models/commune';


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
const Region = RegionModel(sequelize, DataTypes)
const District = DistrictModel(sequelize, DataTypes)
const Commune = CommuneModel(sequelize, DataTypes)

Province.hasMany(Region, {
  foreignKey: 'provinceId'
})
Region.belongsTo(Province)

Region.hasMany(District, {
  foreignKey: 'regionId'
})
District.belongsTo(Region)

District.hasMany(Commune, {
  foreignKey: 'districtId'
})
Commune.belongsTo(District)


const initDb = () => {
  sequelize.sync({force: true}).then(_ => {
    console.log("[SUCCESS] Database connection synchronized!")
  }).catch(e => {
    console.log(`[ERROR] Database connection not synchronized : ${e}`)
  })
}

export {
  initDb,
  Province,
  Region,
  District,
  Commune
}