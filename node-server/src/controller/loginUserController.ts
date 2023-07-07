import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/Model";

export default async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        const accessToken = jwt.sign(
            { _id: user?._id, username: user?.username },
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: "5m" }
        );

        const refreshToken = jwt.sign(
            { _id: user?._id, username: user?.username },
            process.env.REFRESH_TOKEN_SECRET as string,
            { expiresIn: "1d" }
        );

        await User.findByIdAndUpdate(
            { _id: user?._id },
            { $set: { refreshToken } }
        ); // Saving refreshToken with current user

        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).json({ accessToken, user });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                name: error.name,
                msg: error.message,
            });
            console.log(error);
        }
    }
};
