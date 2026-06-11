import type {
    Request,
    Response,
    NextFunction,
} from "express";
import type { ZodSchema } from "zod/v3";
import { errorResponse } from "../utils/responses/responses";

export const requestValidator = (schema: ZodSchema) => (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            return errorResponse(res, "invalid request body", 400);
        }
        next();
    } catch (error) {
        return errorResponse(res, "invalid request body", 400);
    }
}

export const jsonValidator = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.type === "entity.parse.failed") {
        return errorResponse(res, "invalid request body", 400);
    }
    next(err);
}