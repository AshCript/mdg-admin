import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import auth from '../../auth/auth';
import { User } from '../../db/sequelize';
import jwt from 'jsonwebtoken';
import PRIVATE_KEY from '../../auth/private_key';

// Email and role can't be changed.
const update = (app: Express) => {
  app.put('/api/user/update', auth(['user', 'admin']), (req: Request, res: Response) => {
    const email = req.query.email
    if(!email){
      const message = 'You have to supply ?email query parameter ' + email
      return res.status(400).json({ message })
    }
    User.findOne({where: {email}}).then((user: any): any => {
      if(!user){
        const message = `User with email ${email} doesn't exist.`
        return res.status(404).json({ message })
      }


      const headerAuthorization = req.headers.authorization
      if(headerAuthorization){
        const token = headerAuthorization.split(' ')[1]
        jwt.verify(token, PRIVATE_KEY, (error, decodedToken: any) => {
          if(error){
            const message = "User not allowed to access this resource."
            return res.status(401).json({ message, data: error })
          }
    
          const userId = decodedToken.userId
          const userRole = decodedToken.userRole
    
          if(user.email !== userId || user.role !== userRole){
            const message = "Permission denied!"
            return res.status(401).json({ message })
          }
          const warning = req.body.email !== user.email ? "Email can't be changed anymore.":""
    
          User.update(req.body, {where: {email}}).then(_ => {
            const message = `User with email ${email} updated successfully! ${warning}`
            res.json({ message, data: {old: user, new: req.body} })
          }).catch(e => {
            const message = "Something went wrong"
            res.status(500).json({ message, data: e })
          })
        })
      }else{
        const message = "Supply correct token."
        res.status(401).json({ message })
      }

    }).catch(e => {
      const message = "Something went wrong"
      res.status(500).json({ message, data: e })
    })
  })
}

export default update