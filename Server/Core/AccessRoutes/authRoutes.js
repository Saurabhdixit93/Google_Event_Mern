import { Router } from "express";
import { getUser, googleAuth } from "../Controllers/authController.js";
import { ValidateAuthUser } from "../AccessMiddlewares/Validation.js";
const authRouter = Router();

authRouter.post("/login", googleAuth);
authRouter.get("/get-user", ValidateAuthUser, getUser);

export default authRouter;
