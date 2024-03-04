import express from "express";

import userRouter from "./user";
import productRouter from "./product";
import orderRouter from "./order";
import userController from "../controllers/users";
import { authMiddleware } from "../middlewares/auth";

const router: express.Router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);

router.use(authMiddleware);

router.use("/users", userRouter);
router.use("/product", productRouter);
router.use("/order", orderRouter);

export default router;
