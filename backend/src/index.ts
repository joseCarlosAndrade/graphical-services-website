import { prisma } from '../utils/prisma.server'
import { login, register } from '../utils/auth.server'
import express from 'express'
import { requireJwtMiddleware } from '../utils/middleware.server'
import { encodeSession } from '../utils/token.server'
import { Session } from '../utils/types.server'
import dotenv from 'dotenv'

dotenv.config()
const TOKEN_SECRET = process.env.TOKEN_SECRET || ''

var cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use("/protected", requireJwtMiddleware);

// curl -d '{"email": "manafei", "password": "ewofiawj", "profile": {"firstName": "Shogo", "lastName": "Shima"}}' -H "Content-Type: application/json" http://localhost:8080/signup
app.post(`/signup`, async (req, res) => {
    const ans = await register(req.body)
    if (ans.status === 200) {
        const session = encodeSession(TOKEN_SECRET, {
            id: ans.userId || 'err',
            username: ans.userName || 'err',
            dateCreated: new Date().getTime()
        })
        res.status(201).json(session)
    } else {
        res.status(ans.status).json(ans.message)
    }
})

// Set up an HTTP Get listener at /protected. The request can only access it if they have a valid JWT token
app.get("/protected", (req, res) => {
    // The auth middleware protects this route and sets res.locals.session which can be accessed here
    const session: Session = res.locals.session;

    res.status(200).json({ message: `Hello, ${session.username}!` });
});

app.post(`/login`, async (req, res) => {
    const ans = await login(req.body)
    if (ans.status === 200) {
        const session = encodeSession(TOKEN_SECRET, {
            id: ans.userId || 'err',
            username: ans.userName || 'err',
            dateCreated: new Date().getTime()
        })
        res.status(201).json(session)
    } else {
        res.status(ans.status).json(ans.message)
    }
})

// curl -d '{"url":"iewajfwo", "authorEmail": "lana@prisma.io"}' -H "Content-Type: application/json" http://localhost:8080/request
app.post(`/request`, async (req, res) => {
    const { url, authorEmail } = req.body
    const result = await prisma.request.create({
        data: {
            url,
            author: { connect: { email: authorEmail } }
        },
    })
    res.json(result)
})

// curl -X PUT -H 'Content-Type: application/json' -d '{"newPrice": 6000}' http://localhost:8080/request/66137fbc2380054923c17c43
app.put('/request/:id', async (req, res) => {
    const { id } = req.params
    const { newPrice } = req.body

    try {
        const request = await prisma.request.update({
            where: { id: id },
            data: {
                price: newPrice
            },
        })

        res.json(request)
    } catch (error) {
        res.json({ error: `Post with ID ${id} does not exist in the database` })
    }
})

// curl -X DELETE http://localhost:8080/request/66138865726b49b7d82a07ec
app.delete(`/request/:id`, async (req, res) => {
    const { id } = req.params
    const request = await prisma.request.delete({
        where: {
            id: id,
        },
    })
    res.json(request)
})

// curl -v http://localhost:8080/users
app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany()
    res.json(users)
})

// curl -v http://localhost:8080/user/66137fbc2380054923c17c42/requests
app.get('/user/:id/requests', async (req, res) => {
    const { id } = req.params

    const requests = await prisma.user
        .findUnique({
            where: {
                id: id,
            },
        })
        .requests({
            select: {
                url: true,
                price: true,
            }
        })

    res.json(requests)
})

// curl -v http://localhost:8080/request/66137fbb2380054923c17c41
app.get(`/request/:id`, async (req, res) => {
    const { id }: { id?: string } = req.params

    const post = await prisma.request.findUnique({
        where: { id: id },
    })
    res.json(post)
})

const server = app.listen(8080, () =>
    console.log(`
🚀 Server ready at: http://localhost:8080
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)