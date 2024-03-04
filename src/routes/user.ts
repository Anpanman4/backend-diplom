import express from "express";
import userController from "../controllers/users";

const userRouter: express.Router = express.Router();

userRouter.get("", userController.getUsers);
userRouter.get("/me", userController.getMe);
userRouter.get("/:id", userController.getUserById);
userRouter.patch("", userController.updateUserInfo);

export default userRouter;
