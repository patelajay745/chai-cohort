import "dotenv/config";
import "./db/index.js";
import express from "express";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//all routes
import { authRouter } from "./routes/auth.route.js";
app.use("/api/v1/user", authRouter);

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
