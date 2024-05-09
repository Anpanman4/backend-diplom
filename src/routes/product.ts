import express from "express";

import productController from "../controllers/product";
import uploadMiddleware from "../middlewares/uploadImage";

import {
  validatorGetProductById,
  validatorCreateProduct,
  validatorUpdateProductVisibleById,
  validatorUpdateProductContentById,
  validatorDeleteProductById,
} from "../utils/validator";
import { authMiddleware } from "../middlewares/auth";

const productRouter: express.Router = express.Router();

productRouter.get("", productController.getProducts);
productRouter.get(
  "/:id",
  validatorGetProductById,
  productController.getProductById
);

productRouter.use(authMiddleware);

productRouter.post(
  "",
  uploadMiddleware.single("image"),
  validatorCreateProduct,
  productController.createProduct
);
productRouter.patch(
  "/image/:id",
  uploadMiddleware.single("image"),
  productController.updateProductImageById
);
productRouter.patch(
  "/visible/:id",
  validatorUpdateProductVisibleById,
  productController.changeProductVisibility
);
productRouter.patch(
  "/:id",
  validatorUpdateProductContentById,
  productController.updateProductById
);
productRouter.delete(
  "/:id",
  validatorDeleteProductById,
  productController.deleteProductById
);

export default productRouter;
