import express from "express";

import { userRouter } from "./modules/users/user.router";
import config from "./config";
import initDB from "./config/db";
import { authRouter } from "./modules/auth/auth.router";
import { vehicleRouter } from "./modules/vehicles/vehicle.router";

const app = express();
const port = config.port;

// parser
app.use(express.json());

initDB();
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/vehicles",vehicleRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
