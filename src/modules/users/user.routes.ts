import { Router } from "express";
import { UsersController } from "./users.controller";
import { createUserSchema, loginUserSchema, updateUserSchema } from "./users.schema";
import { requestValidator } from "../../middleware/validator";
import { authorization } from "../../middleware/authorization";

const router = Router();
const usersController = new UsersController();

router.post("/", requestValidator(createUserSchema), usersController.createUserService);
router.post("/login", requestValidator(loginUserSchema), usersController.userLogin);
router.get("/", authorization, usersController.getUserDetails);
router.put("/", [authorization, requestValidator(updateUserSchema)], usersController.updateUser);
router.delete("/", authorization, usersController.deleteUser);
router.get("/profile", authorization, usersController.updateProfileImage);
router.delete("/profile", authorization, usersController.deleteProfileImage)

export default router;