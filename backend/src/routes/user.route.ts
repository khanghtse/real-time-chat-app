import { Router } from "express";
import { passportAuthenticateJwt } from "../configs/passport.config";
import { getUserController } from "../controllers/user.controller";


const userRoutes = Router()
  .use(passportAuthenticateJwt)
  .get("/all", getUserController)

export default userRoutes;
