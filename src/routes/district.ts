import { Express } from 'express-serve-static-core';
import add from './district/add';
import findAll from './district/findAll';
import findById from './district/findById';
import init from './district/init';
import findAllByRegion from './district/findAllByRegion';
import findAllByProvince from './district/findAllByProvince';
import update from './district/update';
import remove from './district/remove';

const district = (app: Express) => {
  add(app)
  init(app)
  findAll(app)
  findById(app)
  findAllByRegion(app)
  findAllByProvince(app)
  update(app)
  remove(app)
}

export default district