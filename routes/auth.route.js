import { Router } from "express";
import { Signup,Signin } from "../controllers/auth.controller.js";
const router = Router()
router.post('/signup',Signup)
router.post('/login',Signin)
export default router