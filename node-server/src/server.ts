import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import connectDB from "./config/dbConfig";
import { errorLogs, requestLogs } from "./middleware/logger";
import createUserRoute from "./routes/createUserRoute";
import loginUserRoute from "./routes/loginUserRoute";

const app = express();

connectDB();

app.use(cors());
app.use(requestLogs);
app.use(express.json());
app.use(errorLogs);

app.use("/", createUserRoute);
app.use("/", loginUserRoute);

mongoose.connection.once("open", () => {
    const PORT = process.env.SERVER_PORT || 8000;

    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
