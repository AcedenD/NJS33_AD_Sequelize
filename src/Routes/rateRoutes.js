import express from "express";
import {
  createRate,
  getRate,
  getRateByRes,
  getRateByUser,
} from "../Controllers/rateController.js";

const rateRoutes = express.Router();

// R
rateRoutes.get("/get-rate", getRate);
rateRoutes.get("/get-rate-by-user", getRateByUser);
rateRoutes.get("/get-rate-by-res", getRateByRes);

// CUD
rateRoutes.post("/create-rate", createRate);

export default rateRoutes;
