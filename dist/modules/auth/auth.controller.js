"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const user_service_1 = require("../users/user.service");
const auth_services_1 = require("./auth.services");
const signUp = async (req, res) => {
    try {
        const result = await user_service_1.userServices.createUser(req.body);
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: result.rows[0],
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await auth_services_1.authServices.loginUser(email, password);
        res.status(200).json({
            success: true,
            message: "Login successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.authController = {
    signUp,
    loginUser,
};
