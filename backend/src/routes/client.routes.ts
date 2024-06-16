import { Router } from "express";
import { createRequest } from "../controllers/request.controller";

const router = Router();

// method for the user to create a quoting request
// curl -X POST http://localhost:8080/request -H "Content-Type: application/json" -d '{"title": "New Request Title", "url": "http://example.com", "authorEmail": "shogoshima@usp.br"}'
router.post(`/request`, async (req, res) => {
    const { title, url, authorEmail } = req.body
    const result = await createRequest(title, url, authorEmail);
    if ('request' in result) {
        res.status(200).json(result.request);
    } else {
        res.status(400).json(result.error);
    }
})

export default router