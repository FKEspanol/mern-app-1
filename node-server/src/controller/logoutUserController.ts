import { Request, Response } from "express";
import { User } from "../models/Model";

const logoutHandler = async (request: Request, response: Response) => {
    // delete the acccessToken in the client

    try {
        const cookies = request.cookies;
        if (!cookies?.jwt) return response.sendStatus(204); // 204 no content
        console.log(cookies.jwt);

        const refreshToken = cookies.jwt;
        const user = await User.findOne({ refreshToken });

        if (!user) {
            response.clearCookie("jwt", { httpOnly: true });
            return response.sendStatus(204);
        }
        // delete the refreshToken in the database
        await User.findByIdAndUpdate(user._id, {
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
    } catch (error) {
        console.error(error);
        response.status(500).json(error);
    }
};

export default logoutHandler;
