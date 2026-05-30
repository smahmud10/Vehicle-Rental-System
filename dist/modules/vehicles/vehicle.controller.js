"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleController = void 0;
const vehicle_service_1 = require("./vehicle.service");
const createVehicle = async (req, res) => {
    try {
        const result = await vehicle_service_1.vehicleServices.createVehicle(req.body);
        console.log(req.body);
        res.status(201).json({
            success: true,
            message: "Data Inserted Successfully",
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
const getAllVehicles = async (req, res) => {
    try {
        const result = await vehicle_service_1.vehicleServices.getAllVehicles();
        res.status(200).json({
            success: true,
            message: "Vehicles fetched Successfully",
            data: result,
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
const getSingleVehicle = async (req, res) => {
    try {
        const result = await vehicle_service_1.vehicleServices.getSingleVehicle(req.params.vehicleId);
        if (!result) {
            res.status(404).json({
                success: false,
                message: "Vehicle not found",
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Vehicle fetched successfully",
                data: result,
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
const updateVehicle = async (req, res) => {
    try {
        const result = await vehicle_service_1.vehicleServices.updateVehicle(req.body, req.params.vehicleId);
        if (!result) {
            res.status(404).json({
                success: false,
                message: "Vehicle not found",
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Vehicle Updated successfully",
                data: result,
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
const deleteVehicle = async (req, res) => {
    try {
        const result = await vehicle_service_1.vehicleServices.deleteVehicle(req.params.vehicleId);
        if (!result) {
            res.status(404).json({
                success: false,
                message: "vehicle not found",
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Vehicle deleted successfully",
                data: result,
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
exports.vehicleController = {
    createVehicle,
    getAllVehicles,
    getSingleVehicle,
    updateVehicle,
    deleteVehicle,
};
