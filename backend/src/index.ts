import express from 'express'
import { prisma } from './services/prisma.service'
import { login, loginWithGoogle, register } from './controllers/auth.controller'
import { requireJwtMiddleware } from './server/requiteJwt.middleware'
import { encodeSession } from './server/token.server'
import { Session } from './models/session.models'
import { verify } from './controllers/email.controller'
import { createUser } from './controllers/user.controller'
import { requireAdminMiddleWare } from './server/requireAdmin.middleware'
import { createRequest, deleteRequest, getAllRequestsFromUser, getRequestInfo, updateRequestInfo } from './controllers/request.controller'

import * as dotenv from 'dotenv';
dotenv.config();
const TOKEN_SECRET = process.env.TOKEN_SECRET || ''

var cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

// The request can only access it if they have a valid JWT token
// The auth middleware protects this route and sets res.locals.session which can be accessed here
app.use("/protected", requireJwtMiddleware);
app.get("/protected", (req, res) => {
    const session: Session = res.locals.session;
    res.status(200).json({ message: `Hello, ${session.email}!` });
});

// The request can only access it if they have a valid JWT token and the user associated with it is an admin
app.use("/admin/dashboard", requireJwtMiddleware, requireAdminMiddleWare)
app.get("/admin/dashboard", (req, res) => {
    res.status(200).json({ message: "Hello, admin!" });
})

// creates an user with default role "client"
// curl -d '{"email": "manafei", "password": "ewofiawj", "profile": {"firstName": "Shogo", "lastName": "Shima"}}' -H "Content-Type: application/json" http://localhost:8080/signup
app.post(`/signup`, async (req, res) => {
    const ans = await register(req.body)
    if (ans.status === 200) {
        res.status(201).json()
    } else {
        res.status(ans.status).json(ans.message)
    }
})

// logs existing user in database
app.post(`/login`, async (req, res) => {
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
app.post(`/loginGoogle`, async (req, res) => {
    const id = req.body.id_token;
    const ans = await loginWithGoogle(id);
    if (ans.status === 200) {
        const session = encodeSession(TOKEN_SECRET, {
            id: ans.userId || 'err',
            email: ans.email || 'err',
            dateCreated: new Date().getTime()
        })
        res.status(200).json(session)
    } else {
        res.status(ans.status).json(ans.message)
    }
})

// method required for verifing user email
app.post(`/verify-email`, async (req, res) => {
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

// method for the user to create a quoting request
// curl -X POST http://localhost:8080/request -H "Content-Type: application/json" -d '{"title": "New Request Title", "url": "http://example.com", "authorEmail": "shogoshima@usp.br"}'
app.post(`/request`, async (req, res) => {
    const { title, url, authorEmail } = req.body
    const result = await createRequest(title, url, authorEmail);
    if ('request' in result) {
        res.status(200).json(result.request);
    } else {
        res.status(400).json(result.error);
    }
})

// method for the admin to update the price for the quoting of the request
// curl -X PUT http://localhost:8080/admin/request/666df81d385d816cd921669c -H "Content-Type: application/json" -H "X-JWT-Token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpZCI6IlBPRDNsOWtOcGxNWURrSW9jWHVsR3Jva2RXeDIiLCJlbWFpbCI6InNob2dvc2hpbWFAdXNwLmJyIiwiZGF0ZUNyZWF0ZWQiOjE3MTg0ODM2MDgyNjMsImlzc3VlZCI6MTcxODQ4MzYwODI2MywiZXhwaXJlcyI6MTcxODQ4NzIwODI2M30.he85C1TQ1zLg3enP2isRb8qn6Z6UeEJhiCjntd9MSNky03FJnSI-saCf-H8ceobQPX52vfXVjruPEGwJCqxoaw" -d '{"newPrice": 150}'
app.use("/admin/request/:id", requireJwtMiddleware, requireAdminMiddleWare);
app.put('/admin/request/:id', async (req, res) => {
    const { id } = req.params
    const { newPrice } = req.body
    const result = await updateRequestInfo(id, newPrice);
    if ('request' in result) {
        res.status(200).json(result.request);
    } else {
        res.status(400).json(result.error);
    }
})
// curl -v http://localhost:8080/request/66137fbb2380054923c17c41
app.get(`/admin/request/:id`, async (req, res) => {
    const { id }: { id?: string } = req.params
    const result = await getRequestInfo(id);
    if ('request' in result) {
        res.status(200).json(result.request);
    } else {
        res.status(400).json(result.error);
    }
})
// method for the admin to delete the existing request
// curl -X DELETE http://localhost:8080/request/66138865726b49b7d82a07ec
app.delete(`/admin/request/:id`, async (req, res) => {
    const { id } = req.params
    const result = await deleteRequest(id);
    if ('request' in result) {
        res.status(200).json(result.request);
    } else {
        res.status(400).json(result.error);
    }
})

// method for the admin to get all users and their info (including number of pending requests)
// curl -v http://localhost:8080/users
app.use("/admin/users", requireJwtMiddleware, requireAdminMiddleWare);
app.get('/admin/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        res.status(200).json(users)
    } catch (error) {
        console.error("Error fetching users with requests", error);
        res.status(400).json("Error fetching users");
    }
})

// method to get all requests with user id
// curl -v http://localhost:8080/user/66137fbc2380054923c17c42/requests
app.use("/admin/user/:id/requests", requireJwtMiddleware, requireAdminMiddleWare);
app.get('/admin/user/:id/requests', async (req, res) => {
    // user id
    const { id } = req.params
    const result = await getAllRequestsFromUser(id);
    if ('requests' in result) {
        res.status(200).json(result.requests);
    } else {
        res.status(400).json(result.error);
    }
})

const server = app.listen(8080, () =>
    console.log(`
🚀 Server ready at: http://localhost:8080
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)