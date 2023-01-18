import { Express } from "express-serve-static-core"
import province from "./province"

const routes = (app: Express) => {
  province(app)
}

export default routes