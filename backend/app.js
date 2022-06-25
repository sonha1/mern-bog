import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.route.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);

export default app;
