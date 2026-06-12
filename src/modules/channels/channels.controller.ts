import type {
    Request,
    Response,
} from "express";
import { ChannelsService } from "./channels.service";
import { errorResponse, successResponse } from "../../utils/responses/responses";
import { AppError } from "../../utils/errors/error";

export class ChannelsController {
    constructor(
        private channelService = new ChannelsService(),
    ) { }

    createChannel = async (
        req: Request,
        res: Response,
    ) => {
        try {
            const result = await this.channelService.createChannel(req.body, req.id as string);
            return successResponse(res, 201, { channel: result });
        } catch (error) {
            if (error instanceof AppError) {
                return errorResponse(res, error.message, error.status);
            }
            return errorResponse(res);
        }
    }
}