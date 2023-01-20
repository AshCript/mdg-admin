import { Sequelize, DataTypes } from 'sequelize';


const DistrictModel = (sequelize: Sequelize, DataTypes) => {
  return sequelize.define('district', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    regionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  })
}

export default DistrictModel