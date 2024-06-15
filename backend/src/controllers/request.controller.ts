import { prisma } from "../services/prisma.service";

export async function getRequestInfo(id: string) {
    try {
        const post = await prisma.request.findUnique({
            where: { id: id },
        })
        return { request: post };
    } catch (e) {
        return { error: e };
    }
}

export async function updateRequestInfo(id: string, newPrice: number) {
    try {
        const result = await prisma.$transaction(async (prisma) => {
            // Find the request and the associated user
            const request = await prisma.request.findUnique({
                where: { id: id },
                include: { author: true }
            });

            if (!request) {
                throw new Error(`Request with ID ${id} does not exist in the database`);
            }

            // Update the request price
            const updatedRequest = await prisma.request.update({
                where: { id: id },
                data: {
                    price: newPrice,
                    pending: false,
                },
            });

            // Decrement the user's reqCount if userId is not null
            if (request.userId && request.pending) {
                await prisma.user.update({
                    where: { id: request.userId },
                    data: {
                        reqCount: { decrement: 1 },
                    },
                });
            }

            return { request: updatedRequest };
        });

        return result;
    } catch (error) {
        console.error(error);
        return { error: error };
    }
}

export async function createRequest(title: string, url: string, authorEmail: string) {
    try {
        const result = await prisma.$transaction(async (prisma) => {
            // Create the request
            const request = await prisma.request.create({
                data: {
                    title,
                    url,
                    author: { connect: { email: authorEmail } }
                },
            });

            // Increment the user's reqCount
            await prisma.user.update({
                where: { email: authorEmail },
                data: { reqCount: { increment: 1 } },
            });

            return request;
        });

        return { request: result };
    } catch (e) {
        return { error: e };
    }
}

export async function deleteRequest(id: string) {
    try {
        const result = await prisma.$transaction(async (prisma) => {
            // Create the request
            const request = await prisma.request.delete({
                where: {
                    id: id,
                },
            })

            // Increment the user's reqCount
            if (request.userId && request.pending) {
                await prisma.user.update({
                    where: { id: request.userId },
                    data: { reqCount: { decrement: 1 } },
                });
            } else {
                throw new Error("Something went wrong with the request ")
            }

            return request;
        });

        return { request: result };
    } catch (e) {
        return { error: e };
    }
}

export async function getAllRequestsFromUser(id: string) {
    try {
        const requests = await prisma.user
            .findUnique({
                where: {
                    id: id,
                },
            })
            .requests({
                select: {
                    id: true,
                    url: true,
                    price: true,
                    pending: true,
                }
            })
        return { requests : requests }
    } catch (e) {
        return { error: e };
    }
}