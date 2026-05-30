"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../../config/db");
const createUser = async (payload) => {
    const { name, email, password, phone } = payload;
    if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
    }
    const lowercaseEmail = email.toLowerCase();
    const hashPass = await bcrypt_1.default.hash(password, 12);
    const result = await db_1.pool.query(`
    INSERT INTO users(name, email, password,phone) VALUES($1,$2,$3,$4) RETURNING *`, [name, lowercaseEmail, hashPass, phone]);
    delete result.rows[0].password;
    return result;
};
const getAllUser = async () => {
    const result = await db_1.pool.query(`SELECT * FROM users`);
    return result;
};
const getSingleUser = async (id) => {
    const result = await db_1.pool.query(`
    SELECT * FROM users WHERE id = $1`, [id]);
    return result;
};
const updateUser = async (name, email, id) => {
    const result = await db_1.pool.query(`
    UPDATE users SET  name = $1,email = $2 WHERE id = $3 RETURNING *`, [name, email, id]);
    return result;
};
const deleteUser = async (id) => {
    const result = await db_1.pool.query(`
    DELETE FROM users WHERE id = $1`, [id]);
    return result;
};
exports.userServices = {
    createUser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser,
};
