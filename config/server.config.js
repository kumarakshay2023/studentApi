import cors from "cors";
import express from "express";
import { globalErrorHandler } from "#root/src/utils/error.util.js";
import router from "../src/routes/index.js";
import swaggerUi from "swagger-ui-express";
// import compression from "compression";
import swaggerDocument from "./swagger.config.js";
import http from "http";
// import initializeSocket from "#controllers/chat";
import path from "path";
// ! CRON JOB

const app = express();

const server = http.createServer(app);

// app.use(compression());
app.use(cors());
app.use(express.json());
app.use("/static", express.static("src/public"));

app.use(express.static(path.resolve("./src/public/")));
app.use((req, res, next) => {
  // console.log(req.origin)
  console.log(req.method, req.path);
  next();
});

// API documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API routes
app.use("/api/v1", router);
app.use(globalErrorHandler);

;

// // Initialize socket with server and app
// initializeSocket(server, app);
// getRequestController(app.get("io"))
// liveChatSupportController(app.get("io"))
// // initializeProjectReminders(app);
// // sendJobNotificationToProvider()
// // scheduleProjectReminders(app)
// resetLemon();

// Export the server
export default server;
