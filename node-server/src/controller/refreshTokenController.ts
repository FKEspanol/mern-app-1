import { Request, Response, response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/Model";

interface MyPayload extends JwtPayload {
    _id: string;
}

const handleRefreshToken = async (req: Request, res: Response) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.jwt) return res.sendStatus(401);
        console.log(cookies.jwt);
        const refreshToken = cookies.jwt;

        const user = await User.findOne({ refreshToken });
        if (!user) return res.sendStatus(403);
        const decoded: MyPayload = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET as string
        ) as MyPayload;

        console.log(decoded._id, user._id);
        if (user._id.toString() !== decoded._id) return res.sendStatus(403);
        const accessToken = jwt.sign(
            { _id: user._id, username: user.username },
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: "60s" }
        );

        res.status(200).json({ accessToken });
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

export default handleRefreshToken;
