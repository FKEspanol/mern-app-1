"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
const logger_1 = require("./middleware/logger");
const createUserRoute_1 = __importDefault(require("./routes/createUserRoute"));
const app = (0, express_1.default)();
(0, dbConfig_1.default)();
app.use((0, cors_1.default)());
app.use(logger_1.requestLogs);
app.use(express_1.default.json());
app.use(logger_1.errorLogs);
app.use("/", createUserRoute_1.default);
mongoose_1.default.connection.once("open", () => {
    const PORT = process.env.SERVER_PORT || 8000;
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
