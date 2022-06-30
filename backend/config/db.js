import mongoose from "mongoose";

const connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Connect success to db");
    })
    .catch((error) => {
      console.log("Error connecting to db: " + error.message);
    });
};
export default connect;
