"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingController = void 0;
const booking_services_1 = require("./booking.services");
const createBooking = async (req, res) => {
    try {
        const result = await booking_services_1.bookingServices.createBooking(req.body, req.user.id);
        res.status(201).json({
            success: true,
            message: "Booking created successfully",
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
const getAllBookings = async (req, res) => {
    try {
        const result = await booking_services_1.bookingServices.getAllBookings(req.user);
        res.status(200).json({
            success: true,
            message: "Bookings fetched successfully",
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
const updateBooking = async (req, res) => {
    try {
        const result = await booking_services_1.bookingServices.updateBooking(req.params.bookingId, req.user);
        res.status(200).json({
            success: true,
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
exports.bookingController = {
    createBooking,
    getAllBookings,
    updateBooking,
};
