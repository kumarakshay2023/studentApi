import chalk from "chalk";
import env from "#configs/env";
import server from "#configs/server";
import sequelize from "#configs/database";

try {
  await sequelize.authenticate();
  console.log(chalk.cyan("Connected to Database successfully"));

  const dbParams = {};
  if (env.NODE_ENV === "dev2") {
    dbParams["alter"] = true;
  }
  if (dbParams.alter) {
    console.log(chalk.greenBright("Database syncing in progress"));
    await sequelize.sync(dbParams);
    console.log(chalk.green("Database synced successfully"));
  }
} catch (err) {
  console.log(err);
}
server.listen(env.PORT, () => {
  console.log(chalk.yellow(`Server started successfully on port ${env.PORT}`));
});
