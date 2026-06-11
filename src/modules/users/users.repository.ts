import prisma from "../../config/prisma";
import type { CreateUserSchema, UpdateProfileImageSchema, UpdateUserSchema } from "./users.schema";

export class UsersRepository {
    async getByEmail(email: string) {
        return await prisma.users.findUnique({
            where: {
                email: email,
            },
            select: {
                id: true,
                password: true,
            }
        });
    }

    async getById(id: string) {
        return await prisma.users.findFirst({
            where: {
                id: id,
            },
            select: {
                id: true,
                profile_image: true,
                full_name: true,
                email: true,
                phone: true,
                created_at: true,
                channels: true,
            }
        });
    }
    async create(data: CreateUserSchema, hashedPassword: string) {
        return await prisma.users.create({
            data: {
                full_name: data.full_name,
                email: data.email,
                password: hashedPassword,
                phone: data.phone,
            },
            select: {
                id: true,
            }
        });
    }

    async update(data: UpdateUserSchema, id: string) {
        return await prisma.users.update({
            where: {
                id: id,
            },
            data: {
                full_name: data.full_name,
                email: data.email,
                phone: data.phone,
            }
        });
    }

    async delete(id: string) {
        return await prisma.users.delete({
            where: {
                id: id,
            }
        });
    }

    async updateProfileImage(data: UpdateProfileImageSchema, id: string) {
        return await prisma.users.update({
            where: {
                id: id,
            },
            data: {
                profile_image: data.profile_image_url,
            }
        });
    }

    async deleteProfileImage(id: string) {
        return await prisma.users.update({
            where: {
                id: id,
            },
            data: {
                profile_image: null,
            },
        });
    }
}