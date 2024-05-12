import express from "express";
import { authToken } from "../middleware/verifyToken.js";
import {
    viewProduct,
    buyProduct
} from "../controllers/customerController.js";

const r = express.Router();

r.get('/customer', authToken, viewProduct);
r.post('/customer', authToken, buyProduct);


export default r;