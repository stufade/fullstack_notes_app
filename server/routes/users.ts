import express from "express";
import { getUserName } from "../controllers/users";
import authorization from "../middlewares/authorization"

const router = express.Router();

router.get("/name", authorization, getUserName);

export default router;