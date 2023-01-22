import { Express } from 'express-serve-static-core';
import add from './fokotany/add';
import findById from './fokotany/findById';
import findAll from './fokotany/findAll'
import update from './fokotany/update';
import remove from './fokotany/remove';


const fokotany = (app: Express) => {
  add(app)
  findById(app)
  findAll(app)
  update(app)
  remove(app)
}

export default fokotany