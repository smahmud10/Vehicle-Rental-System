"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
const createUser = async (req, res) => {
    try {
        const result = await user_service_1.userServices.createUser(req.body);
        res.status(201).json({
            success: true,
            message: "Data Inserted Successfully",
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
const getAllUser = async (req, res) => {
    try {
        const result = await user_service_1.userServices.getAllUser();
        res.status(200).json({
            success: true,
            message: "Users fetched Successfully",
            data: result.rows,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            details: error,
        });
    }
};
const getSingleUser = async (req, res) => {
    if (req.user?.role === "customer" &&
        req.user?.id !== Number(req.params.userId)) {
        return res.status(403).json({
            success: false,
            message: "Forbidden Access",
        });
    }
    try {
        const result = await user_service_1.userServices.getSingleUser(req.params.userId);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "user not found",
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "User fetched successfully",
                data: result.rows[0],
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            details: error,
        });
    }
};
const updateUser = async (req, res) => {
    if (req.user?.role === "customer" &&
        req.user?.id !== Number(req.params.userId)) {
        return res.status(403).json({
            success: false,
            message: "Forbidden Access",
        });
    }
    const { name, email } = req.body;
    try {
        const result = await user_service_1.userServices.updateUser(name, email, req.params.userId);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "user not found",
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "User Updated successfully",
                data: result.rows[0],
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            details: error,
        });
    }
};
const deleteUser = async (req, res) => {
    try {
        console.log(req.body);
        const result = await user_service_1.userServices.deleteUser(req.params.userId);
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "user not found",
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "User deleted successfully",
                data: result.rows,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            details: error,
        });
    }
};
exports.userController = {
    createUser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser,
};
