import { Sequelize, DataTypes } from 'sequelize';


const FokotanyModel = (sequelize: Sequelize, DataTypes) => {
  sequelize.define('fokotany', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  })
}