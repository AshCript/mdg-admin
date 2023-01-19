import { Express } from 'express-serve-static-core';
import add from './province/add';
import findAll from './province/findAll';
import findById from './province/findById';
import init from './province/init';
import remove from './province/remove';
import update from './province/update';

const province = (app: Express) => {
  findAll(app)  /** GE /api/provinces */
  init(app)     /** GE /api/provinces/init */
  findById(app) /** GE /api/province/:id */
  add(app)      /** PO /api/province */
  remove(app)   /** DE /api/province/:id */
  update(app)   /** PU /api/province/:id */
}

export default province