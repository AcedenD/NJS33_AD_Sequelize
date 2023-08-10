import express from "express";
import {
  createLike,
  deleteLike,
  getLike,
  getLikeByRes,
  getLikeByUser,
} from "../Controllers/likeController.js";

const likeRoutes = express.Router();

// R
likeRoutes.get("/get-like", getLike);
likeRoutes.get("/get-like-by-user", getLikeByUser);
likeRoutes.get("/get-like-by-res", getLikeByRes);

// CUD
likeRoutes.post("/create-like", createLike);
likeRoutes.delete("/delete-like", deleteLike);

export default likeRoutes;
