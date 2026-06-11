import jwt from "jsonwebtoken";
import { AppError } from "../../utils/errors/error";
import { UsersService } from "./users.service";
import type {
    NextFunction,
    Request,
    Response,
} from "express";
import { env } from "../../config/env";
import { errorResponse, successResponse } from "../../utils/responses/responses";

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
            return successResponse(res, 201, response);
        } catch (error) {
            if (error instanceof AppError) {
                return errorResponse(res, error.message, error.status);
            }
            return errorResponse(res);
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
            res.cookie("token", token, {
                httpOnly: true,
                secure: env.ENV === "production",
                sameSite: "lax",
                maxAge: 24 * 60 * 60 * 1000,
            });
            return successResponse(res, 200);
        } catch (error) {
            if (error instanceof AppError) {
                return errorResponse(res, error.message, error.status);
            }
            console.log(error);
            return errorResponse(res);
        }
    }

    getUserDetails = async (
        req: Request,
        res: Response,
    ) => {
        try {
            const userDetails = await this.usersService.getUserDetails(req.id as string);
            return successResponse(res, 200, { user: userDetails });
        } catch (error) {
            if (error instanceof AppError) {
                return errorResponse(res, error.message, error.status);
            }
            console.log(error);
            return errorResponse(res);
        }
    }

    updateUser = async (
        req: Request,
        res: Response,
    ) => {
        try {
            const userDetails = await this.usersService.updateUser(req.body, req.id as string);
            return successResponse(res, 200, { user: userDetails });
        } catch (error) {
            if (error instanceof AppError) {
                return errorResponse(res, error.message, error.status);
            }
            console.log(error);
            return errorResponse(res);
        }
    }

    deleteUser = async (
        req: Request,
        res: Response,
    ) => {
        try {
            const userDetails = await this.usersService.deleteUser(req.id as string);
            return successResponse(res, 200, userDetails);
        } catch (error) {
            if (error instanceof AppError) {
                return errorResponse(res, error.message, error.status);
            }
            console.log(error);
            return errorResponse(res);
        }
    }

    updateProfileImage = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const url = await this.usersService.updateProfileImage(req.id as string);
            return successResponse(res, 200, { url: url });
        } catch (error) {
            if (error instanceof AppError) {
                return errorResponse(res, error.message, error.status);
            }
            console.log(error);
            return errorResponse(res);
        }
    }

    deleteProfileImage = async (
        req: Request,
        res: Response,
    ) => {
        try {
            const profileImage = await this.usersService.deleteProfileImage(req.id as string);
            return successResponse(res, 200, profileImage);
        } catch (error) {
            if (error instanceof AppError) {
                return errorResponse(res, error.message, error.status);
            }
            console.log(error);
            return errorResponse(res);
        }
    }
}