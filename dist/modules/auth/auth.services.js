"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../../config/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const loginUser = async (email, password) => {
    const result = await db_1.pool.query(`
    SELECT * FROM users WHERE email = $1
    `, [email]);
    if (result.rows.length === 0) {
        throw new Error("Invalid credentials");
    }
    const user = result.rows[0];
    const match = await bcrypt_1.default.compare(password, user.password);
    if (!match) {
        throw new Error("Invalid credentials");
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id, name: user.name, email: user.email, role: user.role }, config_1.default.jwtSecret, { expiresIn: "7d" });
    delete user.password;
    return { token, user };
};
exports.authServices = {
    loginUser,
};
