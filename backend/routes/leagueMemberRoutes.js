import express from "express";
const router = express.Router();
import { getLeagueMembers, getLeagueMemberById} from '../controllers/leagueMemberController.js';

router.route('/').get(getLeagueMembers);
router.route('/:id').get(getLeagueMemberById);

export default router;