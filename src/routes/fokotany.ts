import { Express } from 'express-serve-static-core';
import add from './fokotany/add';
import findById from './fokotany/findById';
import findAll from './fokotany/findAll'


const fokotany = (app: Express) => {
  add(app)
  findById(app)
  findAll(app)
}

export default fokotany