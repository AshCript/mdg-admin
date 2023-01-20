import { Express } from 'express-serve-static-core';
import add from './district/add';
import findAll from './district/findAll';
import findById from './district/findById';
import init from './district/init';
import findAllByRegion from './district/findAllByRegion';

const district = (app: Express) => {
  add(app)
  init(app)
  findAll(app)
  findById(app)
  findAllByRegion(app)
}

export default district