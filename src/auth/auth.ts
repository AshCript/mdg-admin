import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken';
import PRIVATE_KEY from './private_key';


const auth = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {

    const authorizationHeader = req.headers.authorization
    var token: string = ''
    if(roles.includes('anon')){
      token = authorizationHeader ? authorizationHeader.split(' ')[1] : jwt.sign(
        {
          userId: "anon",
          userRole: "anon"
        },
        PRIVATE_KEY,
        {expiresIn: "3d"},
      )
    }else if(roles.includes('admin') || roles.includes('user')){
      if(!authorizationHeader){
        const message = 'Supply correct token by logging in correctly.'
        return res.status(401).json({ message })
      }
      token = authorizationHeader.split(' ')[1]
    }    

    jwt.verify(token, PRIVATE_KEY, (error, decodedToken: any) => {
      if(error){
        const message = "User not allowed to access this resource."
        return res.status(401).json({ message, data: error })
      }

      const userId = decodedToken.userId
      const userRole = decodedToken.userRole

      if(req.body.userId && req.body.userId !== userId){
        const message = "Invalid user."
        return res.status(401).json({ message })
      }
      if(!roles.includes(userRole)){
        const message = "User not allowed to access this resource."
        return res.status(401).json({ message })
      }

      next()
    })
  }
}

export default auth