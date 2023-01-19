import { Express } from 'express-serve-static-core'
import add from './region/add'
import findAll from './region/findAll'
import findById from './region/findById'
import findAllByProvince from './region/findAllByProvince';
import remove from './region/remove';
import update from './region/update'
import init from './region/init';

const region = (app:Express) => {
  findAll(app)            /** GE /api/regions */
  init(app)               /** GE /api/regions/init */
  findById(app)           /** GE /api/region/:id */
  findAllByProvince(app)  /** GE /api/regions/:provinceId */
  add(app)                /** PO /api/region */
  update(app)             /** PU /api/region/:id */
  remove(app)             /** DE /api/region/:id */
}

export default region