import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const router = Router();
router.post("/", userController.createUser);
router.get("/",auth(), userController.getAllUser);
router.get("/:userId", userController.getSingleUser);
router.put("/:userId", userController.updateUser);
router.delete("/:userId", userController.deleteUser);

export const userRouter = router;
