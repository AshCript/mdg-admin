import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken';
import PRIVATE_KEY from './private_key';


const auth = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {

    const authorizationHeader = req.headers.authorization
    var token: string = ''
    if(roles.includes('anon')){
      token = authorizationHeader !== undefined ? authorizationHeader.split(' ')[1] : jwt.sign(
        {
          userId: "anon",
          userRole: "anon"
        },
        PRIVATE_KEY,
        {expiresIn: "30d"},
      )
    }else if(roles.includes('admin') || roles.includes('user')){
      if(!authorizationHeader){
        const message = 'Supply correct token.'
        return res.status(401).json({ message })
      }
      token = authorizationHeader.split(' ')[1]
    }
    
    

    jwt.verify(token, PRIVATE_KEY, (error, decodedToken: any) => {
      if(error){
        const message = "User not allowed to access this resource."
        return res.status(401).json({ message, data: error })
      }

      const userEmail = decodedToken.userEmail
      const userRole = decodedToken.userRole

      if(req.body.userEmail && req.body.userEmail !== userEmail){
        const message = "Invalid user ID"
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