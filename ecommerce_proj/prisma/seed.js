import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();
async function main() {
    const passwordHash = await bcrypt.hash("ChangeMe123!", 12);
    await prisma.user.upsert({
        where: { email: "admin@example.com" },
        update: {},
        create: {
            name: "Demo Admin",
            email: "admin@example.com",
            passwordHash,
            role: Role.ADMIN
        }
    });
    const category = await prisma.category.upsert({
        where: { slug: "electronics" },
        update: {},
        create: { name: "Electronics", slug: "electronics" }
    });
    await prisma.product.upsert({
        where: { slug: "demo-headphones" },
        update: {},
        create: {
            name: "Demo Headphones",
            slug: "demo-headphones",
            description: "Seed product for local development",
            price: "49.99",
            stock: 25,
            categoryId: category.id
        }
    });
}
main()
    .then(() => console.log("Seed completed"))
    .catch((error) => { console.error(error); process.exit(1); })
    .finally(async () => prisma.$disconnect());
