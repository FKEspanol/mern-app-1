import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { User } from "../models/Model";

export default async (req: Request, res: Response) => {
    try {
        const { username, email, password, firstName, lastName } = req.body;
        const hashedPassword = bcrypt.hashSync(
            password,
            bcrypt.genSaltSync(10)
        );
        const newUser = await new User({
            username,
            email,
            password: hashedPassword,
            firstName,
            lastName,
            fullName: `${firstName} ${lastName}`,
        }).save();
        res.status(201).json({ newUser, type: "success" });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: {
                type: "ServerError",
                details: error,
            },
        });
    }
};
