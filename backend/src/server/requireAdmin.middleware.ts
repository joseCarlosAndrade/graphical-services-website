import { Request, Response, NextFunction } from "express";
import { prisma } from "../services/prisma.service";
import { UserDBData } from "../models/form.models";
import { Session } from "../models/session.models";

// Middleware to check if the user is an admin
export const requireAdminMiddleWare = async (request: Request, response: Response, next: NextFunction) => {
    const session: Session = response.locals.session;
    const result = await prisma.user.findUnique({
        where: { id: session.id },
    })
    if (result) {
        const user: UserDBData = result;
        if (user.role === 'admin') {
            next(); // User is an admin, proceed to the next middleware
        } else {
            response.status(403).json({ message: 'Forbidden' }); // User is not an admin, send 403 Forbidden
        }
    } else {
        response.status(400).json({ message: 'No User Found' }); // User is not found in database
    }
};