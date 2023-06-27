"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyJWT = (req, res, next) => {
    try {
        const cookies = req.cookies;
        if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
            return res.sendStatus(401);
        const authHeader = req.headers["authorization"];
        if (!authHeader)
            return res.sendStatus(401);
        console.log(authHeader);
        const token = authHeader.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.currentUserId = decoded._id;
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                name: error.name,
                msg: error.message,
            });
            console.log(error);
        }
    }
};
exports.default = verifyJWT;
