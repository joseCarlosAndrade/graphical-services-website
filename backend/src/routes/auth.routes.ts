import { Router } from "express";
import { login } from "../controllers/auth.controller";
import { encodeSession } from "../server/token.server";

const TOKEN_SECRET = process.env.TOKEN_SECRET || ''
const router = Router()

router.post(`/login`, async (req, res) => {
    const ans = await login(req.body)
    if (ans.status === 200) {
        const session = encodeSession(TOKEN_SECRET, {
            id: ans.userId || 'err',
            email: ans.email || 'err',
            dateCreated: new Date().getTime()
        })
        res.status(201).json(session)
    } else {
        res.status(ans.status).json(ans.message)
    }
})

router.post(`/signup`, async (req, res) => {

})

router.post(`/verify-email`, async (req, res) => {

})

export default router