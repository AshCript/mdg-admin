import { Express } from 'express-serve-static-core';
import login from './auth/login';
import signup from './auth/signup';
import update from './auth/update';


const auth = (app: Express) => {
  login(app)
  signup(app)
  update(app)
}

export default auth