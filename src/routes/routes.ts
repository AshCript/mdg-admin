import { Express } from "express-serve-static-core"
import district from "./district"
import province from "./province"
import region from "./region"
import commune from './commune';
import fokotany from './fokotany';

const routes = (app: Express) => {
  province(app)
  region(app)
  district(app)
  commune(app)
  fokotany(app)
}

export default routes