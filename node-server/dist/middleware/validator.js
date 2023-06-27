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
exports.validateLoginData = exports.validateRegistrationData = void 0;
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const Model_1 = require("../models/Model");
class ExpressValidatorError extends Error {
    constructor(errors) {
        super("Express Validation Error");
        (this.name = "ExpressValidatorError"), (this.errors = errors);
    }
}
const validateRegistrationData = [
    (0, express_validator_1.body)("firstName")
        .notEmpty()
        .withMessage("First name is required")
        .isAlpha()
        .withMessage("First name must be letters only")
        .isLength({ min: 2 })
        .withMessage("First name must be at least 2 characters long"),
    (0, express_validator_1.body)("lastName")
        .notEmpty()
        .withMessage("Last name is required")
        .isAlpha()
        .withMessage("Last name must be letters only")
        .isLength({ min: 2 })
        .withMessage("Last name must be at least 2 characters long"),
    (0, express_validator_1.body)("username")
        .notEmpty()
        .withMessage("Username is required")
        .isAlphanumeric()
        .withMessage("Username must be alphanumeric")
        .isLength({ min: 6 })
        .withMessage("Username must be atleast 6 characters")
        .escape(),
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email address"),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                console.log("Errorf here");
                throw new ExpressValidatorError(errors.array({ onlyFirstError: true }));
            }
            else {
                const data = (0, express_validator_1.matchedData)(req);
                const emailExist = yield Model_1.User.findOne({ email: data === null || data === void 0 ? void 0 : data.email });
                if (emailExist) {
                    const errors = [
                        {
                            type: "field",
                            msg: "That email already exist",
                            path: "email",
                            location: "body",
                            value: data === null || data === void 0 ? void 0 : data.email,
                        },
                    ];
                    throw new ExpressValidatorError(errors);
                }
                next();
            }
        }
        catch (error) {
            if (error instanceof ExpressValidatorError &&
                error.name === "ExpressValidatorError") {
                res.status(400).json({ errors: error.errors });
            }
            else {
                res.status(500).json({ error });
            }
        }
    }),
];
exports.validateRegistrationData = validateRegistrationData;
const validateLoginData = [
    (0, express_validator_1.body)("email").notEmpty().withMessage("Enter your email"),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Enter your password"),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                throw new ExpressValidatorError(errors.array({ onlyFirstError: true }));
            }
            else {
                const data = (0, express_validator_1.matchedData)(req);
                const emailExist = yield Model_1.User.findOne({ email: data === null || data === void 0 ? void 0 : data.email });
                if (!emailExist) {
                    const errors = [
                        {
                            type: "field",
                            msg: "That email is not registered",
                            path: "email",
                            location: "body",
                            value: data === null || data === void 0 ? void 0 : data.email,
                        },
                    ];
                    throw new ExpressValidatorError(errors);
                }
                else {
                    const passwordMatched = yield bcrypt_1.default.compare(data === null || data === void 0 ? void 0 : data.password, emailExist.password);
                    if (!passwordMatched) {
                        const errors = [
                            {
                                type: "field",
                                msg: "Password do not match",
                                path: "password",
                                location: "body",
                                value: data === null || data === void 0 ? void 0 : data.email,
                            },
                        ];
                        throw new ExpressValidatorError(errors);
                    }
                    next();
                }
            }
        }
        catch (error) {
            if (error instanceof ExpressValidatorError &&
                error.name === "ExpressValidatorError") {
                res.status(400).json({ errors: error.errors });
            }
            else {
                res.status(500).json({
                    errors: [
                        {
                            type: "ServerError",
                            msg: "Something went wrong in the server",
                            details: error,
                        },
                    ],
                });
            }
        }
    }),
];
exports.validateLoginData = validateLoginData;
