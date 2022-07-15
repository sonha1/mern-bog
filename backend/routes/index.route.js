import userRouter from "./user.route.js";
import postRouter from "./post.route.js";
const routes = (app) => {
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/post", postRouter);
  app.get("/status", (req, res) => {
    res.status(200).json({ message: "success", status: 200 });
  });
};

export default routes;
