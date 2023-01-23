import { Sequelize } from 'sequelize';


const FokotanyModel = (sequelize: Sequelize, DataTypes: typeof import("sequelize/types/data-types")) => {
  return sequelize.define('fokotany', {
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
          msg: 'Fokotany name must not be null'
        },
        notEmpty: {
          msg: 'Fokotany name must not be empty'
        },
        isLong(value: string | any[]){
          if(value.length < 3){
            throw new Error('Fokotany name length must be greater than 3')
          }
        }
      }
    }
  },{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  })
}

export default FokotanyModel