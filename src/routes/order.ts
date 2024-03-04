import express from "express";
import orderController from "../controllers/order";

const orderRouter: express.Router = express.Router();

orderRouter.get("", orderController.getOrders);
orderRouter.post("", orderController.createOrder);

export default orderRouter;
