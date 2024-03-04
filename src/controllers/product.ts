import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import fs from "fs";

import Product from "../models/product";

import SyntaxError from "../errors/syntaxError";
import AlreadyCreatedError from "../errors/alreadyCreatedError";
import AuthError from "../errors/authError";

dotenv.config();

class ProductController {
  getProducts = async (req: Request, res: Response, next: NextFunction) => {
    return res.send(await Product.find({}));
  };

  createProduct = (req: Request, res: Response, next: NextFunction) => {
    const { title, about } = req.body;

    if (req.file) {
      const { destination, filename } = req.file;

      Product.create({ title, about, image: `${destination}${filename}` })
        .then(product => {
          res.status(201).send(product);
        })
        .catch(err => {
          if (err.name === "ValidationError")
            next(new SyntaxError("Переданы некорректные данные при создании продукта."));
          next(err);
        });
    } else {
      next(new Error("Файл не передан"));
    }
  };

  // to do
  updateProductById = async (req: Request, res: Response, next: NextFunction) => {
    const { title, about, isVisible } = req.body;
    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(id, { title, about, isVisible }, { new: true });
    return res.send(updatedProduct);
  };

  updateProductImageById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (req.file) {
      const { destination, filename } = req.file;
      const productBefore = await Product.findById(id);
      Product.findByIdAndUpdate(id, { image: `${destination}${filename}` }, { new: true }).then(newProduct => {
        fs.unlink(`${productBefore?.image}`, err => {
          if (err) return console.log(err);
        });
        res.send(newProduct);
      });
    }
  };

  deleteProductById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const answer = await Product.findByIdAndDelete({ _id: id });
    fs.unlink(`${answer?.image}`, err => {
      if (err) console.log(err);
    });
    return res.send({ answer: "Успешно удален" });
  };
}

const productController = new ProductController();

export default productController;
