import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const router = Router();
router.post("/", userController.createUser);
router.get("/",auth("admin"), userController.getAllUser);
router.get("/:userId",auth("admin", "customer"),userController.getSingleUser);
router.put("/:userId",auth("admin", "customer"), userController.updateUser);
router.delete("/:userId", auth("admin"), userController.deleteUser);

export const userRouter = router;
