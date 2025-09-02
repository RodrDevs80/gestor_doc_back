import { Router } from "express";
import authRouter from "./router.js";

const allRouter = Router();
// /api/v1/base/login
// /api/v1/base/register
// /api/v1/base/logout
// /api/v1/base/protected
allRouter.use("/base", authRouter);

export default allRouter;