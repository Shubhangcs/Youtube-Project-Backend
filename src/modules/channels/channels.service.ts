import { AppError } from "../../utils/errors/error";
import { ChannelsRepository } from "./channels.repository";
import type { CreateChannelsSchema } from "./channels.schema";


export class ChannelsService {
    constructor(
        private channelsRepository = new ChannelsRepository(),
    ) { }

    createChannel = async (data: CreateChannelsSchema, id: string) => {
        return await this.channelsRepository.create(data, id);
    }
}