import { Router } from "express";
import { login } from "../controllers/auth.controller";
import { encodeSession } from "../server/token.server";

const TOKEN_SECRET = process.env.TOKEN_SECRET || ''
const router = Router()

export default router