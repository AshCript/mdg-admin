import { Express } from 'express-serve-static-core';
import add from './commune/add';
import findAll from './commune/findAll';
import remove from './commune/remove';
import update from './commune/update';
import init from './commune/init';
import findAllByDistrict from './commune/findAllByDistrict';
import findAllByRegion from './commune/findAllByRegion';


const commune = (app: Express) => {
  add(app)
  findAll(app)
  findAllByDistrict(app)
  findAllByRegion(app)
  update(app)
  remove(app)
  init(app)
}

export default commune