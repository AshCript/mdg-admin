import { Express } from 'express-serve-static-core';
import add from './fokotany/add';
import findById from './fokotany/findById';


const fokotany = (app: Express) => {
  add(app)
  findById(app)
}

export default fokotany