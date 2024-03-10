import express from "express";

import orderController from "../controllers/order";

import {
  validatorGetOrderById,
  validatorCreateOrder,
  validatorPutOrderById,
  validatorDeleteOrderById,
} from "../utils/validator";

const orderRouter: express.Router = express.Router();

orderRouter.get("/open", orderController.getOpenOrders);
orderRouter.get("/close", orderController.getCloseOrders);
orderRouter.get("/:id", validatorGetOrderById, orderController.getOrderById);
orderRouter.post("", validatorCreateOrder, orderController.createOrder);
orderRouter.put("/:id", validatorPutOrderById, orderController.changeOrderVisible);
orderRouter.delete("/:id", validatorDeleteOrderById, orderController.deleteOrderById);

export default orderRouter;
