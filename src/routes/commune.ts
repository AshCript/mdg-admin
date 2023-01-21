import { Express } from 'express-serve-static-core';
import add from './commune/add';
import findAll from './commune/findAll';


const commune = (app: Express) => {
  add(app)
  findAll(app)
}

export default commune