import express from "express";
import { getSummary } from "../controllers/summaryController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.use(authMiddleware);


router.get("/", getSummary);

export default router;
