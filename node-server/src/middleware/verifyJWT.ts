import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface MyRequest extends Request {
    currentUserId?: string | JwtPayload;
}

interface MyPayload extends JwtPayload {
    _id: string;
}

const verifyJWT = (req: MyRequest, res: Response, next: NextFunction) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.jwt) return res.sendStatus(401);
        const authHeader = req.headers["authorization"];
        if (!authHeader) return res.sendStatus(401);
        console.log(authHeader);

        const token = authHeader.split(" ")[1];
        const decoded: MyPayload = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET as string
        ) as MyPayload;

        req.currentUserId = decoded._id;
        next();
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

export default verifyJWT;
