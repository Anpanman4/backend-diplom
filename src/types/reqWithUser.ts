import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export type RequestWithUser = Request & {
  user?: any;
};

type IUser = JwtPayload & {
  _id: string;
};
