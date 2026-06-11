import { Router } from "express";
import { UsersController } from "./users.controller";
import { createUserSchema, loginUserSchema } from "./users.schema";
import { requestValidator } from "../../middleware/validator";

const router = Router();
const usersController = new UsersController();

router.post("/", requestValidator(createUserSchema), usersController.createUserService);
router.post("/login", requestValidator(loginUserSchema), usersController.userLogin)

export default router;