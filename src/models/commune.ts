import { Sequelize } from 'sequelize';


const CommuneModel = (sequelize: Sequelize, DataTypes: typeof import("sequelize/types/data-types")) => {
  return sequelize.define('commune', {
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
          msg: 'Commune name must not be null'
        },
        notEmpty: {
          msg: 'Commune name must not be empty'
        },
        isLong(value: string | any[]){
          if(value.length < 3){
            throw new Error('Commune name length must be greater than 3')
          }
        }
      }
    },
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  })
}

export default CommuneModel