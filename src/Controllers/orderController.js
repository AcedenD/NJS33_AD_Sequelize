import sequelize from "../Models/index.js";
import initModels from "../Models/init-models.js";
import { Sequelize } from "sequelize";

const model = initModels(sequelize);

//R
const getOrder = async (req, res) => {
  let data = await model.order.findAll();
  res.send(data);
};

// CUD
const createOrder = async (req, res) => {
  try {
    let { user_id, food_id, amount, arr_sub_id } = req.body;

    let data = await model.order.findAll({
      where: { user_id, food_id },
    });
    if (data.length > 0) {
      res.send("User không được order món này lại");
    } else {
      let data = await model.order.create({
        user_id,
        food_id,
        amount,
        arr_sub_id: "[" + arr_sub_id + "]",
      });
      res.send("User đã order thành công");
    }
  } catch (exp) {
    // console.log(exp.message);
    if (exp.fields == "user_id") {
      res.send("User không tồn tại");
    } else {
      res.send("Food không tồn tại");
    }
  }
};

export { getOrder, createOrder };
