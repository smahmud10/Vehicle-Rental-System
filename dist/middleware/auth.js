"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const auth = (...roles) => {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            console.log(req.headers.authorization);
            console.log({ authToken: token });
            if (!token) {
                return res.status(401).json({ message: "You are not allowed" });
            }
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
            req.user = decoded;
            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden Access",
                });
            }
            next();
        }
        catch (error) {
            res.status(401).json({
                success: false,
                message: error.message,
            });
        }
    };
};
exports.default = auth;
