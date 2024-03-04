import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

import Product from "../models/product";

import SyntaxError from "../errors/syntaxError";
import AlreadyCreatedError from "../errors/alreadyCreatedError";
import AuthError from "../errors/authError";

dotenv.config();

class ProductController {
  getProducts = async (req: Request, res: Response, next: NextFunction) => {
    return res.send(await Product.find({}));
  };

  createProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { title, about, image } = req.body;

    const product = await Product.create({ title, about, image });
    return res.send(product);
  };

  updateProductById = async (req: Request, res: Response, next: NextFunction) => {
    const { title, about, image, isVisible } = req.body;
    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(id, { title, about, image, isVisible }, { new: true });
    return res.send(updatedProduct);
  };

  deleteProductById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const answer = await Product.findByIdAndDelete({ id });
    return res.send({ answer: "Успешно удален" });
  };
}

const productController = new ProductController();

export default productController;
