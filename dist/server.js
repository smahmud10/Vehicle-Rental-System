"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_router_1 = require("./modules/users/user.router");
const config_1 = __importDefault(require("./config"));
const db_1 = __importDefault(require("./config/db"));
const auth_router_1 = require("./modules/auth/auth.router");
const vehicle_router_1 = require("./modules/vehicles/vehicle.router");
const booking_touter_1 = require("./modules/booking/booking.touter");
const app = (0, express_1.default)();
const port = config_1.default.port;
// parser
app.use(express_1.default.json());
(0, db_1.default)();
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/api/v1/users", user_router_1.userRouter);
app.use("/api/v1/auth", auth_router_1.authRouter);
app.use("/api/v1/vehicles", vehicle_router_1.vehicleRouter);
app.use("/api/v1/bookings", booking_touter_1.bookingRouter);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
