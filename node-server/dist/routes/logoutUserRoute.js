"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logoutUserController_1 = __importDefault(require("../controller/logoutUserController"));
const router = express_1.default.Router();
router.get("/", logoutUserController_1.default);
exports.default = router;
