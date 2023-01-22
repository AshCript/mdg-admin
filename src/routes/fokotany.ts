import { Express } from 'express-serve-static-core';
import add from './fokotany/add';


const fokotany = (app: Express) => {
  add(app)
}

export default fokotany