import express from "express";
import {
  findAll,
  findOne,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { authToken } from "../middleware/verifyToken.js";

const r = express.Router();

r.get("/product", authToken, findAll);
r.get("/product/:id", authToken, findOne);
r.post("/product", authToken, createProduct);
r.put("/product/:id", authToken, updateProduct);
r.delete("/product/:id", authToken, deleteProduct);
export default r;
