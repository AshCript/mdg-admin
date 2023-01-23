import { Sequelize, DataTypes } from 'sequelize';

const ProvinceModel = (sequelize: Sequelize, DataTypes: typeof import("sequelize/types/data-types")) => {
  return sequelize.define('province', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        isInt: {
          msg: 'Foreign Key provinceId must be an integer.'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Province name must not be null'
        },
        notEmpty: {
          msg: 'Province name must not be empty'
        },
        isLong(value: string | any[]){
          if(value.length < 3){
            throw new Error('Province name length must be greater than 3')
          }
        }
      }
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