import { cleanEnv, str, port, bool } from "envalid";
import { configDotenv } from "dotenv";

configDotenv();

const variables = process.env;

const env = cleanEnv(variables, {
  DB_HOST: str({ default: "localhost" }),
  DB_USER: str(),
  DB_PASSWORD: str(),
  DB_NAME: str(),
  DB_DIALECT: str(),
  PORT: port({ default: 3000 }),
  NODE_ENV: str({
    choices: ["development", "production", "dev2"],
    default: "development",
  }),

  ENABLE_FEATURE: bool({ default: false }), // Example boolean variable
});
 
export default env;
