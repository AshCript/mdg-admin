import { Express } from 'express-serve-static-core';
import add from './district/add';
import init from './district/init';

const district = (app: Express) => {
  add(app)
  init(app)
}

export default district