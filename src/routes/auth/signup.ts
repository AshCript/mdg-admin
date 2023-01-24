import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import { User } from '../../db/sequelize';
import { ValidationError, UniqueConstraintError } from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import PRIVATE_KEY from '../../auth/private_key';

const signup = (app: Express) => {
  app.post('/api/signup', (req: Request,res: Response) => {
    const userData = req.body
    User.findOne({where: { email: userData.email }}).then(user => {
      if(user){
        const message = "User with that email already exists. Try another email."
        return res.status(401).json({ message })
      }

      bcrypt.hash(userData.password, 10).then(hash => {
        return User.create({
          "firstName": userData.firstName,
          "lastName": userData.lastName,
          "email": userData.email,
          "role": userData.email === "asjosvah@gmail.com" ? "admin" : "user",
          "password": hash
        }).then((u: any) => {
          const token = jwt.sign(
            {
              userId: u.email,
              userRole: u.role
            },
            PRIVATE_KEY,
            {expiresIn: "3d"},
          )
          const message = "User added successfully!"
          res.json({ message, data: u, token})
        })
      }).catch(e => {
        const message = "Something went wrong!"
        return res.status(500).json({ message, data: e })
      })
    }).catch(e => {
      if(e instanceof ValidationError || e instanceof UniqueConstraintError){
        return res.status(400).json({ message: e.message, data: e })
      }
      const message = "Something went wrong. Retry later!"
      res.status(500).json({ message, data: e})
    })
  })
}

export default signup