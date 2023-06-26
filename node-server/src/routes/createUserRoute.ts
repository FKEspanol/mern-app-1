import express from "express";
import { validateRegistrationData } from "../middleware/validator";
import createUserController from "../controller/createUserController";

const router = express.Router();

router.post("/createUser", validateRegistrationData, createUserController);

export default router;
