import express from "express";
import orderController from "../controllers/order";

const orderRouter: express.Router = express.Router();

orderRouter.get("/open", orderController.getOpenOrders);
orderRouter.get("/close", orderController.getCloseOrders);
orderRouter.get("/:id", orderController.getOrderById);
orderRouter.post("", orderController.createOrder);
orderRouter.put("/:id", orderController.changeOrderVisible);
orderRouter.delete("/:id", orderController.deleteOrderById);

export default orderRouter;
