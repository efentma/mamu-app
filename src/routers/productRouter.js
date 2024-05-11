import express from "express";
import {
    findAll,
    findOne,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/productController.js";

const r = express.Router();

r.get('/product', findAll);
r.get('/product/:id', findOne);
r.post('/product', createProduct);
r.put('/product/:id', updateProduct);
r.delete('/product/:id', deleteProduct);
export default r;