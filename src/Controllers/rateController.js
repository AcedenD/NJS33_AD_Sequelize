import sequelize from "../Models/index.js";
import initModels from "../Models/init-models.js";
import { Sequelize } from "sequelize";

const model = initModels(sequelize);

// R

const getRate = async (req, res) => {
  let data = await model.rate_res.findAll();

  res.send(data);
};

const getRateByUser = async (req, res) => {
  let { user_id } = req.body;
  console.log(`id: ${user_id}`);
  let data = await model.like_res.findAll({
    where: { user_id: user_id },
  });

  if (data.length > 0) {
    res.send(data);
  } else {
    res.send("User chưa rate restaurant nào hết, hoặc user không tồn tại");
  }
};

const getRateByRes = async (req, res) => {
  let { res_id } = req.body;
  console.log(`id: ${res_id}`);
  let data = await model.like_res.findAll({
    where: { res_id: res_id },
  });

  if (data.length > 0) {
    res.send(data);
  } else {
    res.send(
      "Restaurant chưa có rating nào hết, hoặc restaurant không tồn tại"
    );
  }
};

// CUD

const createRate = async (req, res) => {
  try {
    let { user_id, res_id, amount } = req.body;
    let data = await model.rate_res.findAll({
      where: { user_id, res_id },
    });
    if (data.length > 0) {
      res.send("User không được rate restaurant này lại");
    } else {
      if (amount > 5 || amount < 1) {
        res.send("Rate không hợp lệ, rate phải từ 1 đến 5");
        return;
      }
      await model.rate_res.create({
        user_id,
        res_id,
        amount,
        date_rate: new Date(),
      });
      res.send("User rate restaurant thành công!");
    }
  } catch (exp) {
    res.send(exp);
  }
};

export { getRate, getRateByUser, getRateByRes, createRate };
