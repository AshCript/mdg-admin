import { Sequelize, DataTypes} from 'sequelize'
import bcrypt from 'bcrypt'
import UserModel from '../models/user';
import ProvinceModel from '../models/province';
import RegionModel from '../models/region';
import DistrictModel from '../models/district';
import CommuneModel from '../models/commune';
import FokotanyModel from '../models/fokotany';

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

const User = UserModel(sequelize, DataTypes)
const Province = ProvinceModel(sequelize, DataTypes)
const Region = RegionModel(sequelize, DataTypes)
const District = DistrictModel(sequelize, DataTypes)
const Commune = CommuneModel(sequelize, DataTypes)
const Fokotany = FokotanyModel(sequelize, DataTypes)

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

Commune.hasMany(Fokotany, {
  foreignKey: 'communeId'
})
Fokotany.belongsTo(Commune)


const initDb = () => {
  sequelize.sync({alter: true}).then(_ => {
    bcrypt.hash("asjosvah", 10).then(hash => {
      User.create({
        "id": 1,
        "firstName": "RAKOTONDRABE",
        "lastName": "As Manjaka Josvah",
        "email": "asjosvah@gmail.com",
        "password": hash,
        "role": "admin"
      }).then(user => {
        console.log(user.toJSON())
      }).catch(e => {
        console.log(`[ERROR] ${e}`)
      })
    })
    console.log("[SUCCESS] Database connection synchronized!")
  }).catch(e => {
    console.log(`[ERROR] Database connection not synchronized : ${e}`)
  })
}

export {
  initDb,
  User,
  Province,
  Region,
  District,
  Commune,
  Fokotany
}