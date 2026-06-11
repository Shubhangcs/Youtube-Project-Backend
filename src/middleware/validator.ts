import type {
    Request,
    Response,
    NextFunction,
} from "express";
import type { ZodSchema } from "zod/v3";

export const requestValidator = (schema: ZodSchema) => (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                message: "invalid request body",
            });
        }
        next();
    } catch (error) {
        return res.status(400).json({
            message: "invalid request body",
        });
    }
}

export const jsonValidator = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.type === "entity.parse.failed") {
        return res.status(400).json({
            message: "Invalid request body",
        });
    }
    next(err);
}