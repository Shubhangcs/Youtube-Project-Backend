import type {
    Response
} from "express";

export const successResponse = (
    res: Response,
    statusCode: number,
    data?: unknown,
) => {
    return res.status(statusCode).json({
        message: "success",
        data: data,
    });
}

export const errorResponse = (
    res: Response,
    message: string = "internal server error",
    statusCode: number = 500,
) => {
    return res.status(statusCode).json({
        message: message,
    });
}