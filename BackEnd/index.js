import express from 'express';
const app = express();
import path from "path";
import dotenv from "dotenv";
import mongoConnect from "./mongoConnect.js"
import userRouter from "./Router/user.js";
import bodyParser from "body-parser";

dotenv.config({ path: path.resolve("BackEnd/config.env") });
mongoConnect();

app.use("/user", userRouter)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.resolve("./frontend/build")));

app.use("*", (req, res) => {
       res.sendFile(path.resolve("./frontend/build/index.html"));
})

app.listen(process.env.PORT, () => {
       console.info("Server Listening on Port No: " + process.env.PORT);
})