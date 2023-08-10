import express from "express";
import { findFood, getFood } from "../Controllers/foodController.js";

const foodRoutes = express.Router();

// /food/get-food", getFood

// nơi định nghĩa API và quản lý chức năng của đối tượng
// GET, POST, PUT, DELETE

foodRoutes.get("/get-food", getFood);
foodRoutes.get("/find-food", findFood);

// yarn add multer

import multer from "multer";

// process.cwd() => trả về đường dẫn tuyệt đối của thư mục hiện tại

// __dirname: trả về đường dẫn tuyệt đối của thư mục chứa file hiện tại

// upload yori_food.png => same name that already exists in img folder

const storage = multer.diskStorage({
  destination: process.cwd() + "/public/img",
  filename: (req, file, callback) => {
    // change file name
    // time => YYYY-MM-DD hh:mm:ss:ms
    // random()

    let date = new Date(); // get current date/time/second of computer
    let newName = date.getTime();

    callback(null, newName + "_" + file.originalname);
  }, // place to cahnge file name when client upload
});

const upload = multer({
  //dest: process.cwd() + "/public/img", // nơi lưu tai nguyên upload từ client (đường dẫn thư mục muốn lưu)
  storage,
});

import fs from "fs"; // already have , interact with file in source

foodRoutes.post("/upload", upload.single("file"), (req, res) => {
  let file = req.file;

  // File System => FS
  // create data.txt file => hello world
  fs.writeFile(process.cwd() + "/data.txt", "hello world", (err) => {
    // fs.unlink(process.cwd() + "/data2.txt", (err) => {});
    res.send("tao file thang cong");
    // let data = fs.readFileSync(process.cwd() + "/data.txt", "utf-8");
    // res.send(data);
  });
});

export default foodRoutes;
