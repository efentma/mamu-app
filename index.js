import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productRouter from "./src/routers/productRouter.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(productRouter);

app.listen(process.env.APP_PORT, () =>{
    console.log('Server running..');
})
