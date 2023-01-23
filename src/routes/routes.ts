import { Express } from "express-serve-static-core"
import district from "./district"
import province from "./province"
import region from "./region"
import commune from './commune';
import fokotany from './fokotany';
import mdgAdminInit from "./mdgAdminInit";
import login from './auth/login';

const routes = (app: Express) => {
  login(app)
  mdgAdminInit(app)
  province(app)
  region(app)
  district(app)
  commune(app)
  fokotany(app)
}

export default routes