import express from "express";

import userRouter from "./user";
import productRouter from "./product";
import orderRouter from "./order";

import userController from "../controllers/users";

import { validatorRegister, validatorLogin } from "../utils/validator";

const router: express.Router = express.Router();

router.post("/register", validatorRegister, userController.register);
router.post("/login", validatorLogin, userController.login);

router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/orders", orderRouter);

export default router;
