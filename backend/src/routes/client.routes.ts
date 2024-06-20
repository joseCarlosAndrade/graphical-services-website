import { Router } from "express";
import { createRequest, getAllRequestsFromUser } from "../controllers/request.controller";
import { requireAdminMiddleWare } from "../server/requireAdmin.middleware";
import { requireJwtMiddleware } from "../server/requiteJwt.middleware";
import { Session } from "../models/session.models";
import { UserDBData } from "../models/form.models";
import { prisma } from "../services/prisma.service";
import { updateUserInfo } from "../controllers/user.controller";

const router = Router();

// method for the user to create a quoting request
// curl -X POST http://localhost:8080/request -H "Content-Type: application/json" -d '{"title": "New Request Title", "url": "http://example.com", "authorEmail": "shogoshima@usp.br"}'
router.use('/request', requireJwtMiddleware)
router.post(`/request`, async (req, res) => {
    const { title, url } = req.body
    const session: Session = res.locals.session;
    const result = await createRequest(title, url, session.email);
    if ('request' in result) {
        res.status(200).json(result.request);
    } else {
        res.status(400).json(result.error);
    }
})

router.use('/user/info', requireJwtMiddleware)
router.get('/user/info', async (req, res) => {
    const session: Session = res.locals.session;
    const user: UserDBData | null = await prisma.user.findUnique({
        where: { id: session.id },
    })
    const requests = await getAllRequestsFromUser(session.id);

    if (user === null) {
        res.status(404).json({ error: 'User not found' });
    } else {
        res.status(200).json({ user: user, requests: requests });
    }
})

router.use('/update', requireJwtMiddleware);
router.put('/update', async (req, res) => {
    const session: Session = res.locals.session;
    const user: UserDBData | null = await prisma.user.findUnique({
        where: { id: session.id },
    })
    if (user != null) {
        const result = await updateUserInfo(user, req.body);
        if (result.status === 200) {
            res.status(201).json(result.loggedUser);
        } else {
            res.status(400).json(result.error);
        }
    } else {
        res.status(400).json('User not found.');
    }
}) 

export default router