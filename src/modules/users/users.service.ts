import { S3Helper } from "../../config/s3";
import { AppError } from "../../utils/errors/error";
import { UsersRepository } from "./users.repository";
import type { CreateUserSchema, LoginUserSchema, UpdateUserSchema } from "./users.schema";

export class UsersService {
    constructor(
        private usersRepository = new UsersRepository(),
        private s3Helper = new S3Helper(),
    ) { }

    createUser = async (data: CreateUserSchema) => {
        const isUserExists = await this.usersRepository.getByEmail(data.email);
        if (isUserExists) throw new AppError("user already exist", 400);

        const hashedPassword = await Bun.password.hash(data.password);
        return await this.usersRepository.create(data, hashedPassword);
    }

    loginUser = async (data: LoginUserSchema) => {
        const userData = await this.usersRepository.getByEmail(data.email);
        if (!userData) throw new AppError("user not found", 404);

        const result = await Bun.password.verify(data.password, userData.password);
        if (!result) throw new AppError("invalid user credentials", 400);

        return userData.id;
    }

    getUserDetails = async (id: string) => {
        const userDetails = await this.usersRepository.getById(id);
        if (!userDetails) throw new AppError("user not found", 404);

        return userDetails;
    }

    updateUser = async (data: UpdateUserSchema, id: string) => {
        const userDetails = await this.usersRepository.update(data, id);
        if (!userDetails) throw new AppError("user not found", 404);

        return userDetails;
    }

    deleteUser = async (id: string) => {
        const userDetails = await this.usersRepository.delete(id);
        if (!userDetails) throw new AppError("user not found", 404);

        return userDetails;
    }

    updateProfileImage = async (id: string) => {
        const key = `users/profile/${id}_${Date.now()}.png`;
        const url = await this.s3Helper.getUploadUrl(key, "image/png");
        await this.usersRepository.updateProfileImage({ profile_image_url: key }, id);
        return url;
    }

    deleteProfileImage = async (id: string) => {
        const profileImage = await this.usersRepository.deleteProfileImage(id);
        return profileImage;
    }
}