import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productRouter from "./src/routers/productRouter.js";
import customerRouter from "./src/routers/customerRouter.js";
// import purchaseController from "./src/controllers/purchaseController.js";
import userRouter from "./src/routers/userRouter.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(productRouter);
app.use(customerRouter);
// app.use(purchaseController);
app.use(userRouter);

app.listen(process.env.APP_PORT, () =>{
    console.log('Server running..');
})
