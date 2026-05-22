import { pool } from "../../config/db";


const loginUser = async (email: string, password: string) => {
  const result = await pool.query(
    `
    SELECT * FROM users WHERE email = 1$
    `,
    [email],
  );
};
