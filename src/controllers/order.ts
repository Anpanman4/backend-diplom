import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

import Order from "../models/order";

import SyntaxError from "../errors/syntaxError";
import AlreadyCreatedError from "../errors/alreadyCreatedError";
import AuthError from "../errors/authError";
import { RequestWithUser } from "../types/reqWithUser";

dotenv.config();

class OrderController {
  getOrderById = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    Order.findById(id)
      .populate(["userId", "productIds.productId"])
      .then(order => {
        res.send(order);
      })
      .catch(err => {
        next(err);
      });
  };

  getOpenOrders = (req: Request, res: Response, next: NextFunction) => {
    Order.find({ isClosed: false })
      .populate(["userId", "productIds.productId"])
      .then(orders => {
        res.send(orders);
      })
      .catch(err => {
        next(err);
      });
  };

  getCloseOrders = (req: Request, res: Response, next: NextFunction) => {
    Order.find({ isClosed: true })
      .populate(["userId", "productIds.productId"])
      .then(orders => {
        res.send(orders);
      })
      .catch(err => {
        next(err);
      });
  };

  createOrder = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const userId = req.user._id;
    const { productIds, deliverPlace } = req.body;
    try {
      const order = await Order.create({ userId, productIds, deliverPlace });
      return res.send(order);
    } catch (err) {
      next(err);
    }
  };

  changeOrderVisible = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { isClosed } = req.body;
    try {
      const order = await Order.findByIdAndUpdate(id, { isClosed }, { new: true });
      return res.send(order);
    } catch (err) {
      next(err);
    }
  };

  deleteOrderById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const answer = await Order.findByIdAndDelete(id);
      if (!answer) return next(new Error("Произошла ошибка"));
      return res.send({ answer: `Заказ успешно удален` });
    } catch (err) {
      next(err);
    }
  };
}

const orderController = new OrderController();

export default orderController;
