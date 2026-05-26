import jwt, { type JwtPayload } from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import config from "../config";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      console.log({ authToken: token });
      if (!token) {
        return res.status(401).json({ message: "You are not allowed" });
      }
      const decoded = jwt.verify(token, config.jwtSecret as string);
      req.user = decoded as JwtPayload;

      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden Access",
        });
      }

      next();
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  };
};
export default auth;
