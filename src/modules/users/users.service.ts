import { AppError } from "../../utils/errors/error";
import { UsersRepository } from "./users.repository";
import type { CreateUserSchema, LoginUserSchema } from "./users.schema";

export class UsersService {
    constructor(
        private usersRepository = new UsersRepository(),
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
}