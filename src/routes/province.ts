import { Express } from 'express-serve-static-core';
import add from './province/add';
import findAll from './province/findAll';
import findById from './province/findById';
import loadAll from './province/loadAll';
import remove from './province/remove';
import update from './province/update';

const province = (app: Express) => {
  add(app)
  update(app)
  remove(app)
  findById(app)
  findAll(app)
  loadAll(app)
}

export default province