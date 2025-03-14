import { Router } from "express";
import {
  addUser,
  getLogin,
  getLogout,
  getProfile,
  verifyEmailLink,
} from "../controllers/auth.controller.js";
import { isAuth } from "../middlewares/isAuth.js";

export const authRouter = Router();

authRouter.post("/", addUser);
authRouter.post("/login", getLogin);
authRouter.post("/logout", isAuth, getLogout);
authRouter.get("/", isAuth, getProfile);
authRouter.post("/verify", verifyEmailLink);
