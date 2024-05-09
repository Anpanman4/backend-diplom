import express from "express";

import orderController from "../controllers/order";

import {
  validatorGetOrderById,
  validatorCreateOrder,
  validatorPutOrderById,
  validatorDeleteOrderById,
} from "../utils/validator";
import { authMiddleware } from "../middlewares/auth";

const orderRouter: express.Router = express.Router();

orderRouter.post("", validatorCreateOrder, orderController.createOrder);

orderRouter.use(authMiddleware);

orderRouter.get("/open", orderController.getOpenOrders);
orderRouter.get("/close", orderController.getCloseOrders);
orderRouter.get("/:id", validatorGetOrderById, orderController.getOrderById);
orderRouter.put(
  "/:id",
  validatorPutOrderById,
  orderController.changeOrderVisible
);
orderRouter.delete(
  "/:id",
  validatorDeleteOrderById,
  orderController.deleteOrderById
);

export default orderRouter;
