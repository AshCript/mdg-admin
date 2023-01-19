import { Express } from "express-serve-static-core"
import province from "./province"
import region from "./region"

const routes = (app: Express) => {
  province(app)
  region(app)
}

export default routes