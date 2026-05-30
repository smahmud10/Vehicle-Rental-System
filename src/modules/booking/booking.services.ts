import type { JwtPayload } from "jsonwebtoken";
import { pool } from "../../config/db";

const createBooking = async (
  payload: Record<string, unknown>,
  customer_id: number,
) => {
  const { vehicle_id, rent_start_date, rent_end_date } = payload;
  const vehicleResult = await pool.query(
    `SELECT * FROM vehicles WHERE id = $1`,
    [vehicle_id],
  );
  const vehicle = vehicleResult.rows[0];
  if (!vehicle) {
    throw new Error("Vehicle not found");
  }
  if (vehicle.availability_status !== "available") {
    throw new Error("Vehicle is already booked");
  }

  const startDate = new Date(rent_start_date as string);
  const endDate = new Date(rent_end_date as string);
  const timeDiff = endDate.getTime() - startDate.getTime();
  const totalDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
  const total_price = totalDays * Number(vehicle.daily_rent_price);

  const result = await pool.query(
    `INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price],
  );

  await pool.query(
    `UPDATE vehicles SET availability_status = 'booked' WHERE id =$1`,
    [vehicle_id],
  );
  return result.rows[0];
};
const getAllBookings = async (user: JwtPayload) => {
  if (user.role === "admin") {
    const result = await pool.query(`SELECT * FROM bookings`);
    return result.rows;
  }

  const result = await pool.query(
    `SELECT * FROM bookings WHERE customer_id = $1`,
    [user.id],
  );
  return result.rows;
};
const updateBooking = async (bookingId: string, user: JwtPayload) => {
  const bookingResult = await pool.query(
    `SELECT * FROM bookings WHERE id = $1`,
    [bookingId],
  );
  const booking = bookingResult.rows[0];
  if (!booking) {
    throw new Error("Booking not found");
  }
  // Customer → Cancel booking

  if (user.role === "customer") {
    if (booking.customer_id !== user.id) {
      throw new Error("Forbidden Access");
    }

    const today = new Date();
    const startDate = new Date(booking.rent_start_date);

    if (today >= startDate) {
      throw new Error("Cannot cancel after start date");
    }

    await pool.query(
      `UPDATE bookings
      SET status = 'cancelled'
      WHERE id = $1`,
      [bookingId],
    );

    await pool.query(
      `
      UPDATE vehicles
      SET availability_status = 'available'
      WHERE id = $1
      `,
      [booking.vehicle_id],
    );

    return { message: "Booking cancelled successfully" };
  }

  // Admin → Returned
  if (user.role === "admin") {
    await pool.query(
      `UPDATE bookings
      SET status = 'returned'
      WHERE id = $1`,
      [bookingId],
    );

    await pool.query(
      `
      UPDATE vehicles
      SET availability_status = 'available'
      WHERE id = $1
      `,
      [booking.vehicle_id],
    );

    return { message: "Vehicle returned successfully" };
  }
};

export const bookingServices = {
  createBooking,
  getAllBookings,
  updateBooking,
};
