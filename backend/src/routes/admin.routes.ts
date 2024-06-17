import { Router } from 'express';
import { prisma } from '../services/prisma.service';
import { requireJwtMiddleware } from '../server/requiteJwt.middleware';
import { requireAdminMiddleWare } from '../server/requireAdmin.middleware';
import { deleteRequest, getAllRequestsFromUser, getRequestInfo, updateRequestInfo } from '../controllers/request.controller';
import { Session } from '../models/session.models';

const router = Router();

// The request can only access it if they have a valid JWT token and the user associated with it is an admin
router.use("/auth", requireJwtMiddleware, requireAdminMiddleWare)
router.get("/auth", (req, res) => {
    res.status(200).json({ message: "Hello, admin!" });
})

// method for the admin to update the price for the quoting of the request
// curl -X PUT http://localhost:8080/admin/request/666df81d385d816cd921669c -H "Content-Type: application/json" -H "X-JWT-Token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpZCI6IlBPRDNsOWtOcGxNWURrSW9jWHVsR3Jva2RXeDIiLCJlbWFpbCI6InNob2dvc2hpbWFAdXNwLmJyIiwiZGF0ZUNyZWF0ZWQiOjE3MTg0ODM2MDgyNjMsImlzc3VlZCI6MTcxODQ4MzYwODI2MywiZXhwaXJlcyI6MTcxODQ4NzIwODI2M30.he85C1TQ1zLg3enP2isRb8qn6Z6UeEJhiCjntd9MSNky03FJnSI-saCf-H8ceobQPX52vfXVjruPEGwJCqxoaw" -d '{"newPrice": 150}'
router.use("/request/:id", requireJwtMiddleware, requireAdminMiddleWare);
router.put('/request/:id', async (req, res) => {
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
router.get(`/request/:id`, async (req, res) => {
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
router.delete(`/request/:id`, async (req, res) => {
    const { id } = req.params
    const result = await deleteRequest(id);
    if ('request' in result) {
        res.status(200).json(result.request);
    } else {
        res.status(400).json(result.error);
    }
})

// method for the admin to get all users and their info (including number of pending requests)
// curl -v http://localhost:8080/admin/users
// router.use("/users", requireJwtMiddleware, requireAdminMiddleWare);
router.get('/users', async (req, res) => {
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
router.use("/user/requests", requireJwtMiddleware, requireAdminMiddleWare);
router.get('/user/requests', async (req, res) => {
    const session: Session = res.locals.session;
    const result = await getAllRequestsFromUser(session.id);
    if ('requests' in result) {
        res.status(200).json(result.requests);
    } else {
        res.status(400).json(result.error);
    }
})

export default router;