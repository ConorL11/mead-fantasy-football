import express from "express";
const router = express.Router();
import { getSeasons, getSeasonsById } from '../controllers/seasonsController.js';

router.route('/').get(getSeasons);
router.route('/:id').get(getSeasonsById);

export default router;