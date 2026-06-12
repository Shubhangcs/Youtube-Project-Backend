import prisma from "../../config/prisma";
import { AppError } from "../../utils/errors/error";
import type { CreateChannelsSchema } from "./channels.schema";

export class ChannelsRepository {
    async create(data: CreateChannelsSchema, id: string) {
        console.log(id);
        return await prisma.$transaction(async (tx) => {
            const cc = await tx.users.updateMany({
                where: {
                    id: id,
                    channel_count: {
                        lt: 3,
                    }
                },
                data: {
                    channel_count: {
                        increment: 1,
                    }
                },
            });

            if (cc.count === 0) {
                throw new AppError(
                    "channel creation limit exceeded",
                    400,
                );
            }

            return await tx.channels.create({
                data: {
                    user_id: id,
                    channel_name: data.channel_name,
                    channel_description: data.channel_description,
                },
                select: {
                    id: true,
                    channel_name: true,
                    channel_description: true,
                    subscribers_count: true,
                    created_at: true,
                }
            });
        });
    }
}