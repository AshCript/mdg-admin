import { Express } from 'express-serve-static-core';
import add from './fokotany/add';
import findById from './fokotany/findById';
import findAll from './fokotany/findAll'
import update from './fokotany/update';
import remove from './fokotany/remove';
import findAllByCommune from './fokotany/findByCommune';
import findAllByDistrict from './fokotany/findAllByDistrict';
import findAllByRegion from './fokotany/findAllByRegion';


const fokotany = (app: Express) => {
  add(app)
  findById(app)
  findAll(app)
  findAllByCommune(app)
  findAllByDistrict(app)
  findAllByRegion(app)
  update(app)
  remove(app)
}

export default fokotany