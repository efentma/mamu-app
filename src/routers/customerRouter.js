import express from "express";
import {
    viewProduct,
    buyProduct
} from "../controllers/customerController.js";

const r = express.Router();

r.get('/customer', viewProduct);
r.post('/customer', buyProduct);


export default r;