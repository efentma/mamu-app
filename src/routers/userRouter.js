import express from "express";
import {
    register,
    login
} from "../controllers/userController.js";

const r = express.Router();

r.post('/register', register);
r.post('/login', login);

export default r;