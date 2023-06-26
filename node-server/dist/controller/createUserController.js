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
const bcrypt_1 = __importDefault(require("bcrypt"));
const Model_1 = require("../models/Model");
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, firstName, lastName } = req.body;
        const hashedPassword = bcrypt_1.default.hashSync(password, bcrypt_1.default.genSaltSync(10));
        const newUser = yield new Model_1.User({
            username,
            email,
            password: hashedPassword,
            firstName,
            lastName,
            fullName: `${firstName} ${lastName}`,
        }).save();
        res.status(201).json({ newUser, type: "success" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: {
                type: "ServerError",
                details: error,
            },
        });
    }
});
