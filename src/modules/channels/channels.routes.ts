import { Router } from "express";
import { requestValidator } from "../../middleware/validator";
import { createChannelsSchema } from "./channels.schema";
import { ChannelsController } from "./channels.controller";
import { authorization } from "../../middleware/authorization";

const router = Router();
const channelsController = new ChannelsController();

router.post("/", [authorization, requestValidator(createChannelsSchema)], channelsController.createChannel);

export default router;