"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = (0, express_1.Router)();
router.post("/", user_controller_1.userController.createUser);
router.get("/", (0, auth_1.default)("admin"), user_controller_1.userController.getAllUser);
router.get("/:userId", (0, auth_1.default)("admin", "customer"), user_controller_1.userController.getSingleUser);
router.put("/:userId", (0, auth_1.default)("admin", "customer"), user_controller_1.userController.updateUser);
router.delete("/:userId", (0, auth_1.default)("admin"), user_controller_1.userController.deleteUser);
exports.userRouter = router;
