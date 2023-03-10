import { Sequelize } from 'sequelize';

const UserModel = (sequelize: Sequelize, DataTypes: typeof import("sequelize/types/data-types")) => {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'User first name must not be null.'
        },
        notEmpty: {
          msg: 'User first name must not be empty.'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'User name must not be null.'
        },
        notEmpty: {
          msg: 'User name must not be empty.'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: 'unique_email',
        msg: 'Email already taken. Try another email.'
      },
      validate: {
        notNull: {
          msg: 'Email address must not be null.'
        },
        notEmpty: {
          msg: 'Email address must not be empty.'
        },
        isEmail: {
          msg: 'Email address must correspond to email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password must not be null.'
        },
        notEmpty: {
          msg: 'Password must not be empty.'
        },
        isLong(value: string | any[]){
          if(value.length < 3){
            throw new Error('Password length be greater than 2 and less than 31')
          }
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'User role must not be null.'
        },
        notEmpty: {
          msg: 'User role must not be empty.'
        },
        specificValue(value: string){
          if(!['user', 'admin'].includes(value)){
            throw new Error ('User role must be one oth these values : user and admin')
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

export default UserModel