import { Express } from 'express-serve-static-core';
import add from './district/add';
import findAll from './district/findAll';
import init from './district/init';

const district = (app: Express) => {
  add(app)
  init(app)
  findAll(app)
}

export default district