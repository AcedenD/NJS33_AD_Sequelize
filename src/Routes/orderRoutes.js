import express from "express";
import { createOrder, getOrder } from "../Controllers/orderController.js";
const orderRoutes = express.Router();

// R
orderRoutes.get("/get-order", getOrder);

// CUD
orderRoutes.post("/create-order", createOrder);

export default orderRoutes;
