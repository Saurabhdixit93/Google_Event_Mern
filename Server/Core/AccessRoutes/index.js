import { Router } from "express";
import { ValidateAuthUser } from "../AccessMiddlewares/Validation.js";
import eventRouter from "./eventsRoutes.js";
import authRouter from "./authRoutes.js";
const indexRouter = Router();

indexRouter.use("/auth", authRouter);
indexRouter.use("/events", ValidateAuthUser, eventRouter);

export default indexRouter;
