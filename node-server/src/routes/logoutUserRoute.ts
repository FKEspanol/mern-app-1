import express from "express";
import logoutUserController from "../controller/logoutUserController";

const router = express.Router();

router.get("/", logoutUserController);

export default router;
