import express from "express";
import { validateLoginData } from "../middleware/validator";
import loginUserController from "../controller/loginUserController";

const router = express.Router();

router.post("/", validateLoginData, loginUserController);

export default router;
