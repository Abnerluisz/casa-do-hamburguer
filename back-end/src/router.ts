import { Router } from "express";
import { auth, login, register, logout } from "./controller/user-controller.js";

export const router = Router();

// rotas de usuario
router.post("/login", login);
router.post("/register", register);
router.get("/me", auth);
router.post("/logout", logout);
