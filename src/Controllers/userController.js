
import sequelize from '../Models/index.js';
import initModels from '../Models/init-models.js';
import { Sequelize } from 'sequelize';

const Op = Sequelize.Op;

const model = initModels(sequelize);

// R => get all
const getUser = async (req, res) => {

    // bất đồng bộ => asynchronous
    // SELECT * FROM user WHERE user_id = 1 => list object => [{},{}]
    let data = await model.user.findAll(); // => Read

    // SELECT * FROM user JOIN 

    // data = await model.restaurant.findAll({
    //     include: ["user_id_users"]
    // });

    res.send(data);
}

// R => get by id

const getUserById = async (req, res) => {

    let { id } = req.params;

    // SELECT * FROM user WHERE user_id=1 LIMIT 1 => object => {}
    let data = await model.user.findOne({
        where: { user_id: id }
    }); // => Read

    res.send(data);
}

// CUD
const createUser = async (req, res) => {
    try {

        let { full_name, email, pass_word } = req.body;

        let checkEmail = await model.user.findAll({
            where: {
                email
            }
        })

        if (checkEmail.length > 0) {
            res.send("Email đã tồn tại !");
            return;
        }

        let newData = {
            full_name,
            email,
            pass_word
        };
        await model.user.create(newData);

        res.send("thêm mới thành công !");
    }
    catch (exp) {
        console.log(exp);
        res.status(500).send("Lỗi BE");
    }
}
const updateUser = async (req, res) => {
    let { id } = req.params;
    let { full_name, email, pass_word } = req.body;

    //check trùng email

    await model.user.update({ full_name, email, pass_word }, {
        where: { user_id: id }
    });

    res.send("Cập nhật thành công !");

}
const deleteUser = async (req, res) => {
    let { id } = req.params;

    // DELETE FROM user WHERE user_id = ... ;
    await model.user.destroy({ where: { user_id: id } });
    res.send("Xóa thành công !");

}

const getUserByName = async (req, res) => {
    // let [data, metadata] = await sequelize.query("SELECT * FROM user");

    let { fullName } = req.params;
    // SELECT * FROM user WHERE full_name LIKE '%...%'
    let data = await model.user.findAll({
        where: {
            full_name: {
                [Op.like]: `%${fullName}%`
            }
        }
    });

    res.send(data);
}

export { getUser, getUserById, createUser, updateUser, deleteUser, getUserByName }
