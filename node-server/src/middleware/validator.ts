import { Request, Response } from "express";
import {
    body,
    validationResult,
    matchedData,
    ValidationError,
} from "express-validator";
import bcrypt from "bcrypt";
import { User } from "../models/Model";

class ExpressValidatorError extends Error {
    public errors: Array<ValidationError>;
    constructor(errors: Array<ValidationError>) {
        super("Express Validation Error");
        (this.name = "ExpressValidatorError"), (this.errors = errors);
    }
}

const validateRegistrationData = [
    body("firstName")
        .notEmpty()
        .withMessage("First name is required")
        .isAlpha()
        .withMessage("First name must be letters only")
        .isLength({ min: 2 })
        .withMessage("First name must be at least 2 characters long"),

    body("lastName")
        .notEmpty()
        .withMessage("Last name is required")
        .isAlpha()
        .withMessage("Last name must be letters only")
        .isLength({ min: 2 })
        .withMessage("Last name must be at least 2 characters long"),

    body("username")
        .notEmpty()
        .withMessage("Username is required")
        .isAlphanumeric()
        .withMessage("Username must be alphanumeric")
        .isLength({ min: 6 })
        .withMessage("Username must be atleast 6 characters")
        .escape(),

    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email address"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),

    async (req: Request, res: Response, next: Function) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log("Errorf here");
                throw new ExpressValidatorError(
                    errors.array({ onlyFirstError: true })
                );
            } else {
                const data = matchedData(req);
                const emailExist = await User.findOne({ email: data?.email });

                if (emailExist) {
                    const errors: Array<ValidationError> = [
                        {
                            type: "field",
                            msg: "That email already exist",
                            path: "email",
                            location: "body",
                            value: data?.email,
                        },
                    ];

                    throw new ExpressValidatorError(errors);
                }

                next();
            }
        } catch (error) {
            if (
                error instanceof ExpressValidatorError &&
                error.name === "ExpressValidatorError"
            ) {
                res.status(400).json({ errors: error.errors });
            } else {
                res.status(500).json({ errors: error });
            }
        }
    },
];

const validateLoginData = [
    body("email").notEmpty().withMessage("Enter your email"),

    body("password").notEmpty().withMessage("Enter your password"),

    async (req: Request, res: Response, next: Function) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ExpressValidatorError(
                    errors.array({ onlyFirstError: true })
                );
            } else {
                const data = matchedData(req);
                const emailExist = await User.findOne({ email: data?.email });

                if (!emailExist) {
                    const errors: Array<ValidationError> = [
                        {
                            type: "field",
                            msg: "That email is not registered",
                            path: "email",
                            location: "body",
                            value: data?.email,
                        },
                    ];

                    throw new ExpressValidatorError(errors);
                } else {
                    const passwordMatched = await bcrypt.compare(
                        data?.password,
                        emailExist.password as string
                    );
                    if (!passwordMatched) {
                        const errors: Array<ValidationError> = [
                            {
                                type: "field",
                                msg: "Password do not match",
                                path: "password",
                                location: "body",
                                value: data?.email,
                            },
                        ];

                        throw new ExpressValidatorError(errors);
                    }

                    next();
                }
            }
        } catch (error) {
            if (
                error instanceof ExpressValidatorError &&
                error.name === "ExpressValidatorError"
            ) {
                res.status(400).json({ errors: error.errors });
            } else {
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
    },
];

export { validateRegistrationData, validateLoginData };
