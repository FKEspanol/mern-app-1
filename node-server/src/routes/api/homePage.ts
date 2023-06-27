import express, { Request, Response } from "express";
import { User } from "../../models/Model";

const router = express.Router();

interface MyRequest extends Request {
    currentUserId?: string;
}

router.get("/", async (req: MyRequest, res: Response) => {
    try {
        const user = await User.findOne({ _id: req.currentUserId });
        if (!user) {
            return res.sendStatus(403);
        }

        res.status(200).json({
            msg: "jwt verification success",
            user,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                name: error.name,
                msg: error.message,
            });
            console.log(error);
        }
    }
});

export default router;
