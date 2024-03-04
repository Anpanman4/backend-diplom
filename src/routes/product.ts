import express from "express";

import productController from "../controllers/product";
import uploadMiddleware from "../middlewares/uploadImage";

const productRouter: express.Router = express.Router();

productRouter.get("", productController.getProducts);
productRouter.get("/:id", productController.getProductById);
productRouter.post("", uploadMiddleware.single("image"), productController.createProduct);
productRouter.patch("/image/:id", uploadMiddleware.single("image"), productController.updateProductImageById);
productRouter.patch("/visible/:id", productController.changeProductVisibility);
productRouter.patch("/:id", productController.updateProductById);
productRouter.delete("/:id", productController.deleteProductById);

export default productRouter;
