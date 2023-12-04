import express from "express";
const router = express.Router();
import { getCpiData } from "../controllers/cpiDataController.js";

router.route('/').get(getCpiData);

export default router;