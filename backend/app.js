import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.route.js";
import connect from "./config/db.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connect();
routes(app);

app.use((req, res, next) => {
  const error = new Error("not found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    },
  });
});

export default app;
