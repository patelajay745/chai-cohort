import mongoose from "mongoose";

try {
  const dbUrl = process.env.MONGODB_URL;
  mongoose
    .connect(dbUrl)
    .then(() => console.log("Connected"))
    .catch((error) => console.log("Error", error));
} catch (error) {
  console.log(error);
}
