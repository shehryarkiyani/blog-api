import { Router } from "express";
import { Signup,Signin,GoogleAuth } from "../controllers/auth.controller.js";
const router = Router()
router.post('/signup',Signup)
router.post('/login',Signin)
router.post('/google',GoogleAuth)
export default router