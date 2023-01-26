import Router from "express";
import { loginUser, checkJWT, registerUser } from "../controllers/user/index.js";

const router = Router();

router.post("/login", loginUser);
router.post("/validate-token",checkJWT)
router.post("/register",registerUser)

export default router;