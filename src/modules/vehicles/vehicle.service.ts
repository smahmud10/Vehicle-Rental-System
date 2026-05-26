import { pool } from "../../config/db";
const createVehicle = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  if (!vehicle_name) {
    throw new Error("Vehicle name is required");
  }

  if (!type) {
    throw new Error("Vehicle type is required");
  }

  if (!registration_number) {
    throw new Error("Registration number is required");
  }

  if (!daily_rent_price) {
    throw new Error("Daily rent price is required");
  }

  const existing = await pool.query(
    "SELECT id FROM vehicles WHERE registration_number = $1",
    [registration_number],
  );
  if (existing.rows.length > 0) {
    throw new Error("Registration number already exists");
  }

  const status = (availability_status as string) ?? "available";

  const result = await pool.query(
    `
    INSERT INTO vehicles(
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status
    )
    VALUES($1,$2,$3,$4,$5)
    RETURNING *
    `,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ],
  );

  return result.rows[0];
};
const getAllVehicles = async () => {
  const result = await pool.query(`SELECT * FROM vehicles`);
  return result.rows;
};

const getSingleVehicle = async (id: string) => {
  const result = await pool.query(
    `
    SELECT * FROM vehicles WHERE id = $1`,
    [id],
  );
  return result.rows[0];
};

const updateVehicle = async (payload: Record<string, unknown>, id: string) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;
  const result = await pool.query(
    `UPDATE vehicles SET 
  vehicle_name = COALESCE($1, vehicle_name),
  type = COALESCE($2, type),
  registration_number = COALESCE($3, registration_number),
  daily_rent_price = COALESCE($4, daily_rent_price),
  availability_status = COALESCE($5, availability_status),
  updated_at = NOW()
WHERE id = $6
RETURNING *
    `,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
      id,
    ],
  );
  return result.rows[0];
};

const deleteVehicle = async (id: string) => {
  const booking = await pool.query(
    `SELECT id FROM bookings WHERE vehicle_id = $1 AND status = 'active'`,
    [id],
  );
  if (booking.rows.length > 0) {
    throw new Error("Cannot delete vehicle with active bookings");
  }
  const result = await pool.query(
    `
    DELETE FROM vehicles WHERE id = $1`,
    [id],
  );
  return result.rowCount;
};

export const vehicleServices = {
  createVehicle,
  getAllVehicles,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};
