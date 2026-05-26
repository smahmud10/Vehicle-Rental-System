import bcrypt from "bcrypt";
import { pool } from "../../config/db";

const createUser = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone } = payload;

  if ((password as string).length < 6) {
    throw new Error("Password must be at least 6 characters");
  }
  const lowercaseEmail = (email as string).toLowerCase();
  const hashPass = await bcrypt.hash(password as string, 12);
  const result = await pool.query(
    `
    INSERT INTO users(name, email, password,phone) VALUES($1,$2,$3,$4) RETURNING *`,
    [name, lowercaseEmail, hashPass, phone],
  );
  delete result.rows[0].password;
  return result;
};

const getAllUser = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};
const getSingleUser = async (id: string) => {
  const result = await pool.query(
    `
    SELECT * FROM users WHERE id = $1`,
    [id],
  );
  return result;
};
const updateUser = async (name: string, email: string, id: string) => {
  const result = await pool.query(
    `
    UPDATE users SET  name = $1,email = $2 WHERE id = $3 RETURNING *`,
    [name, email, id],
  );
  return result;
};

const deleteUser = async (id: string) => {
  const result = await pool.query(
    `
    DELETE FROM users WHERE id = $1`,
    [id],
  );
  return result;
};

export const userServices = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
