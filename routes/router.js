import { Router } from "express";
import User from "../model/User.model.js";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../config/config.js";

const router = Router();



export default router;