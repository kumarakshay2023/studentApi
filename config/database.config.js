import { Sequelize } from "sequelize";
import env from "./env.config.js";
import chalk from "chalk";

const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
  host: env.DB_HOST,
  dialect: env.DB_DIALECT,
  timezone: "+05:30",
  logging: false,
  // logging: (msg) => console.log(chalk.magentaBright(msg)),
});

export default sequelize;
