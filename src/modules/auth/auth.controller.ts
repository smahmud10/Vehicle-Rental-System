import type { Request, Response } from "express";
import { userServices } from "../users/user.service";
import { authServices } from "./auth.services";

const signUp = async (req: Request, res: Response) => {
  try {
    const result = await userServices.createUser(req.body);
   
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await authServices.loginUser(email, password);

    res.status(200).json({
      success: true,
      message: "Login successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const authController = {
  signUp,
  loginUser,
};
