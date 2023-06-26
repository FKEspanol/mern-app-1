import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/Model";

export default async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error });
    }
};
