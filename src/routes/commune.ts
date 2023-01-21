import { Express } from 'express-serve-static-core';
import add from './commune/add';
import findAll from './commune/findAll';
import remove from './commune/remove';
import update from './commune/update';


const commune = (app: Express) => {
  add(app)
  findAll(app)
  update(app)
  remove(app)
}

export default commune