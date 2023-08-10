import sequelize from "../Models/index.js";
import initModels from "../Models/init-models.js";
import { Sequelize } from "sequelize";

const model = initModels(sequelize);

const getLike = async (req, res) => {
  let data = await model.like_res.findAll();
  res.send(data);
};

const getLikeByUser = async (req, res) => {
  let { userId } = req.params;
  console.log(`id: ${userId}`);
  let data = await model.like_res.findAll({
    where: { user_id: userId },
  });

  // console.log(data);
  res.send(data);
};

const getLikeByRes = async (req, res) => {
  let { resId } = req.params;
  console.log(`id: ${resId}`);
  let data = await model.like_res.findAll({
    where: { res_id: resId },
  });

  // console.log(data);
  res.send(data);
};

const createLike = async (req, res) => {
  try {
    let { user_id, res_id } = req.body;
    console.log(`user id: ${user_id}`);
    console.log(`res id: ${res_id}`);
    let data = await model.like_res.findAll({
      where: { user_id: user_id, res_id: res_id },
    });

    if (data.length > 0) {
      res.send("User đã like restaurant này rồi");
    } else {
      await model.like_res.create({
        user_id,
        res_id,
        date_like: new Date(),
      });

      res.send("User thêm cho restaurant này một like !");
    }
  } catch (exp) {
    // console.log(exp);
    let { user_id, res_id } = req.body;

    if (exp.fields == "user_id") {
      res.send(`User với id: ${user_id}  không tồn tại !`);
      return;
    } else {
      res.send(`Restaurant với id: ${res_id} không tồn tại !`);
      return;
    }
  }
};

const deleteLike = async (req, res) => {
  try {
    let { user_id, res_id } = req.body;
    console.log(`user id: ${user_id}`);
    console.log(`res id: ${res_id}`);
    let data = await model.like_res.findAll({
      where: {
        user_id,
        res_id,
      },
    });

    if (data.length > 0) {
      await model.like_res.destroy({
        where: {
          user_id,
          res_id,
        },
      });
      res.send("Delete like thành công !");
    } else {
      res.send("Like không tồn tại !");
    }
  } catch (exp) {
    // console.log(exp);
    res.send(exp);
  }
};

export { getLike, getLikeByUser, getLikeByRes, createLike, deleteLike };
