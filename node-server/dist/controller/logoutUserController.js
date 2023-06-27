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
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = require("../models/Model");
const logoutHandler = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    // delete the acccessToken in the client
    try {
        const cookies = request.cookies;
        if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
            return response.sendStatus(204); // 204 no content
        console.log(cookies.jwt);
        const refreshToken = cookies.jwt;
        const user = yield Model_1.User.findOne({ refreshToken });
        if (!user) {
            response.clearCookie("jwt", { httpOnly: true });
            return response.sendStatus(204);
        }
        // delete the refreshToken in the database
        yield Model_1.User.findByIdAndUpdate(user._id, {
            $set: {
                refreshToken: "",
            },
        });
        response.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });
        response.sendStatus(204);
    }
    catch (error) {
        console.error(error);
        response.status(500).json(error);
    }
});
exports.default = logoutHandler;
