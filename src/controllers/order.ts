import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

import Order from "../models/order";

import SyntaxError from "../errors/syntaxError";
import AlreadyCreatedError from "../errors/alreadyCreatedError";
import AuthError from "../errors/authError";

dotenv.config();

class OrderController {
  getOrders = async (req: Request, res: Response, next: NextFunction) => {
    return res.send(await Order.find({}));
  };

  createOrder = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, productIds, deliverPlace } = req.body;

    const order = await Order.create({ userId, productIds, deliverPlace });
    return res.send(order);
  };

  // updateOrderById = async (req: Request, res: Response, next: NextFunction) => {
  //   const { title, about, image, isVisible } = req.body;
  //   const { id } = req.params;

  //   const updatedProduct = await Order.findByIdAndUpdate(id, { title, about, image, isVisible }, { new: true });
  //   return res.send(updatedProduct);
  // };

  deleteOrderById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const answer = await Order.findByIdAndDelete({ id });
    return res.send({ answer: "Заказ успешно удален" });
  };
}

const orderController = new OrderController();

export default orderController;
