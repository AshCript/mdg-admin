import { Sequelize, DataTypes } from 'sequelize';

const ProvinceModel = (sequelize: Sequelize, DataTypes: typeof import("sequelize/types/data-types")) => {
  return sequelize.define('province', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  })
}

export default ProvinceModel

// const ProvinceModel = (sequelize: Sequelize, DataTypes: typeof import("sequelize/types/data-types")) => {
//   class Province extends Model {
//     static associate(models:any){

//     }
//   }
//   Province.init({
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false
//     }
//   }, {
//     sequelize,
//     modelName: 'ProvinceModel'
//   })
//   return Province
// }

// export default ProvinceModel