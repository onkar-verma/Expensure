import express from "express";
import connectDB from "./config/dbConfig.js";
export const app = express();
import cookieParser from "cookie-parser";

app.use(express.json({ limit: "24kb" }));

app.use(express.urlencoded({ extended: true, limit: "24kb" }));
app.use(cookieParser());

connectDB();

app.get("/", (req, res) => {
  res.send("Hi I am rooot!");
});
