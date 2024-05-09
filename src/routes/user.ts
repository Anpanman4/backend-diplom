import express from "express";

import userController from "../controllers/users";

import {
  validatorUpdateUserInfo,
  validatorGetUserById,
  validatorUpdateUserStatus,
} from "../utils/validator";
import { authMiddleware } from "../middlewares/auth";

const userRouter: express.Router = express.Router();

userRouter.use(authMiddleware);

userRouter.get("", userController.getUsers);
userRouter.get("/me", userController.getMe);
userRouter.get("/:id", validatorGetUserById, userController.getUserById);
userRouter.patch("/me", validatorUpdateUserInfo, userController.updateUserInfo);
userRouter.patch(
  "/status",
  validatorUpdateUserStatus,
  userController.updateUserStatus
);

export default userRouter;
