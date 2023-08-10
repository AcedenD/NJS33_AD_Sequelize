// kết nối CSDL

import { Sequelize } from "sequelize";
import configEnv from "../Config/config.js";

const sequelize = new Sequelize(
  configEnv.db_database,
  configEnv.db_user,
  configEnv.db_pass,
  {
    host: configEnv.db_host,
    port: configEnv.db_port,
    dialect: configEnv.db_dialect,
  }
);

export default sequelize;
