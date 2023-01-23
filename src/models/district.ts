import { Sequelize } from 'sequelize';


const DistrictModel = (sequelize: Sequelize, DataTypes: typeof import("sequelize/types/data-types")) => {
  return sequelize.define('district', {
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
          msg: 'District name must not be null'
        },
        notEmpty: {
          msg: 'District name must not be empty'
        },
        isLong(value: string | any[]){
          if(value.length < 3){
            throw new Error('District name length must be greater than 3')
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

export default DistrictModel