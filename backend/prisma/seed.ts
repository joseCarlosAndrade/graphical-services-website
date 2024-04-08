import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
    {
        email: 'alice@prisma.io',
        password: '2432423',
        profile: {
            firstName: 'Alice',
            lastName: 'Oliveira'
        },
        requests: {
            create: [
                {
                    url: 'jfweofi',
                }
            ]
        },
    },
    {
        email: 'lana@prisma.io',
        password: '243sdf3',
        profile: {
            firstName: 'Lana',
            lastName: 'Oliveira'
        },
        requests: {
            create: [
                {
                    url: 'fiwjafpewioi',
                },
                {
                    url: 'riqwojefo',
                }
            ]
        }
    }
]

async function main() {
    console.log(`Start seeding ...`)
    for (const u of userData) {
        const user = await prisma.user.create({
            data: u,
        })
        console.log(`Created user with id: ${user.id}`)
    }
    console.log(`Seeding finished.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })