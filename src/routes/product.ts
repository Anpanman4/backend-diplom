import express from "express";
import productController from "../controllers/product";

const productRouter: express.Router = express.Router();

productRouter.get("", productController.getProducts);
productRouter.post("", productController.createProduct);
productRouter.patch("/:id", productController.updateProductById);
productRouter.delete("/:id", productController.deleteProductById);

export default productRouter;
