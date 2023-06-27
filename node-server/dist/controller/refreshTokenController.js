"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Model_1 = require("../models/Model");
const handleRefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cookies = req.cookies;
        if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
            return res.sendStatus(401);
        console.log(cookies.jwt);
        const refreshToken = cookies.jwt;
        const user = yield Model_1.User.findOne({ refreshToken });
        if (!user)
            return res.sendStatus(403);
        const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        console.log(decoded._id, user._id);
        if (user._id.toString() !== decoded._id)
            return res.sendStatus(403);
        const accessToken = jsonwebtoken_1.default.sign({ _id: user._id, username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "60s" });
        res.status(200).json({ accessToken });
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
});
exports.default = handleRefreshToken;
