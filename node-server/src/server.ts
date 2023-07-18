import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import connectDB from "./config/dbConfig";
import { errorLogs, requestLogs } from "./middleware/logger";
import corsOptions from "./config/corsOptions";
import credentials from "./middleware/credentials";
import verifyJWT from "./middleware/verifyJWT";
import refreshToken from "./routes/refreshToken";
import logoutUserRoute from "./routes/logoutUserRoute";
import createUserRoute from "./routes/createUserRoute";
import loginUserRoute from "./routes/loginUserRoute";
import homePage from "./routes/api/homePage";

const app = express();

connectDB();

app.use(credentials);
app.use(cors(corsOptions));
app.use(requestLogs);
app.use(express.json());
app.use(cookieParser());
app.use(errorLogs);

app.use("/createUser", createUserRoute);
app.use("/loginUser", loginUserRoute);
app.use("/logout", logoutUserRoute);
app.use("/refresh", refreshToken);

app.use(verifyJWT);
app.use("/homepage", homePage);

mongoose.connection.once("open", () => {
    const PORT = process.env.SERVER_PORT || 8000;

    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});