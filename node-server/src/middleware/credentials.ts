import { NextFunction, Request, Response } from "express";
import allowOrigins from "../config/allowedOrigins";

const credentials = (req: Request, res: Response, next: NextFunction) => {
    const origin = req.headers.origin as string;
    if (allowOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Credentials", "true");
    }
    next();
};

export default credentials;
