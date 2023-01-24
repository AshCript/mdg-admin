import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import { User } from '../../db/sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import PRIVATE_KEY from '../../auth/private_key';


const login = (app: Express) => {
  app.post('/api/login', (req: Request, res: Response) => {
    const email = req.body.email
    const password = req.body.password
    User.findOne({where: {email}}).then((user: any) => {
      if(!user){
        const message = "Data you just sent contains wrong informations! Check it and retry again!"
        return res.status(401).json({ message })
      }

      bcrypt.compare(password, user.password).then(isPasswordValid => {
        if(!isPasswordValid){
          const message = "Data you just sent contains wrong informations! Check it and retry again!"
          return res.status(401).json({ message })
        }

        const token = jwt.sign(
          {
            userId: email,
            userRole: user.role
          },
          PRIVATE_KEY,
          {expiresIn: "3d"},
        )

        const message = `You are logged in, ${user.lastName} ${user.firstName}`
        res.json({ message, token })
      })
    }).catch(e => {
      const message = "Something went wrong. Retry later!"
      res.status(500).json({ message })
    })
  })
}

export default login