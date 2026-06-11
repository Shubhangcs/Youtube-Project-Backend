import jwt from "jsonwebtoken";
import { AppError } from "../../utils/errors/error";
import { UsersService } from "./users.service";
import type {
    Request,
    Response,
} from "express";
import { env } from "../../config/env";

export class UsersController {
    constructor(
        private usersService = new UsersService(),
    ) { }

    createUserService = async (
        req: Request,
        res: Response,
    ) => {
        try {
            const response = await this.usersService.createUser(req.body);
            return res.status(201).json({
                message: "success",
                result: response,
            });
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(400).json({
                    message: error.message,
                });
            }
            return res.status(500).json({
                message: "internal server error",
            });
        }
    }

    userLogin = async (
        req: Request,
        res: Response,
    ) => {
        try {
            const id = await this.usersService.loginUser(req.body);
            const token = jwt.sign({
                id: id
            }, env.JWT_SECRET, { expiresIn: "1d" });
            return res.status(200).json({
                message: "success",
                token: token,
            });
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(400).json({
                    message: error.message,
                });
            }
            console.log(error);
            return res.status(500).json({
                message: "internal server error",
            });
        }
    }
}