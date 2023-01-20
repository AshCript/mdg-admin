import { Sequelize, DataTypes } from 'sequelize';


const DistrictModel = (sequelize: Sequelize, DataTypes: typeof import("sequelize/types/data-types")) => {
  return sequelize.define('district', {
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

export default DistrictModel