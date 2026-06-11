import type {
    Request,
    Response,
    NextFunction,
} from "express";

import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { errorResponse } from "../utils/responses/responses";

declare global {
    namespace Express {
        interface Request {
            id?: string,
        }
    }
}


export const authorization = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return errorResponse(res, "unauthorized", 401);
        }

        const data = jwt.verify(token, env.JWT_SECRET) as { id: string };
        req.id = data.id;
        next();
    } catch (error) {
        return errorResponse(res, "Invalid token", 401);
    }
}