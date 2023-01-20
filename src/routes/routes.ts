import { Express } from "express-serve-static-core"
import district from "./district"
import province from "./province"
import region from "./region"

const routes = (app: Express) => {
  province(app)
  region(app)
  district(app)
}

export default routes