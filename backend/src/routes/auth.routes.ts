import { Router } from "express";
import { login, loginWithGoogle, register } from "../controllers/auth.controller";
import { encodeSession } from "../server/token.server";
import { createUser } from "../controllers/user.controller";
import { verify } from "../controllers/email.controller";
import { requireJwtMiddleware } from "../server/requiteJwt.middleware";
import { Session } from "../models/session.models";

import * as dotenv from 'dotenv';
dotenv.config();
const TOKEN_SECRET = process.env.TOKEN_SECRET || ''

const router = Router()

// The request can only access it if they have a valid JWT token
// The auth middleware protects this route and sets res.locals.session which can be accessed here
router.use("/protected", requireJwtMiddleware);
router.get("/protected", (req, res) => {
    const session: Session = res.locals.session;
    res.status(200).json({ message: `Hello, ${session.email}!` });
});

// creates an user with default role "client"
// curl -d '{"email": "manafei", "password": "ewofiawj", "profile": {"firstName": "Shogo", "lastName": "Shima"}}' -H "Content-Type: application/json" http://localhost:8080/signup
router.post(`/signup`, async (req, res) => {
    const ans = await register(req.body)
    if (ans.status === 200) {
        res.status(201).json()
    } else {
        res.status(ans.status).json(ans.message)
    }
})

// logs existing user in database
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

// logs/registers with google
router.post(`/loginGoogle`, async (req, res) => {
    const id = req.body.id_token;
    const ans = await loginWithGoogle(id);
    console.log("LOGIN GOOGLE", TOKEN_SECRET);
    if (ans.status === 200) {
        const session = encodeSession(TOKEN_SECRET, {
            id: ans.userId || 'err',
            email: ans.email || 'err',
            dateCreated: new Date().getTime()
        })
        console.log(session)
        res.status(200).json(session)
    } else {
        res.status(ans.status).json(ans.message)
    }
})

// method required for verifing user email
router.post(`/verify-email`, async (req, res) => {
    const { oobCode } = req.body
    // console.log('oobCode received: ', oobCode)
    const userData = await verify(oobCode)
    if (userData.status === 200) {
        const ans = await createUser({
            id: userData.id || '',
            email: userData.email || '',
            displayName: userData.displayName || ''
        })

        const session = encodeSession(TOKEN_SECRET, {
            id: userData.id || 'err',
            email: userData.email || 'err',
            dateCreated: new Date().getTime()
        })

        res.status(201).json(session)
    } else {
        res.status(userData.status).json(userData.message)
    }
})

export default router