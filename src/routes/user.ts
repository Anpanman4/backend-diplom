import express from "express";

import userController from "../controllers/users";

import { validatorUpdateUserInfo, validatorGetUserById } from "../utils/validator";

const userRouter: express.Router = express.Router();

userRouter.get("", userController.getUsers);
userRouter.get("/me", userController.getMe);
userRouter.get("/:id", validatorGetUserById, userController.getUserById);
userRouter.patch("/me", validatorUpdateUserInfo, userController.updateUserInfo);

export default userRouter;
