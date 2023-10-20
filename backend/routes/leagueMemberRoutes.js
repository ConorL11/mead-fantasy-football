import express from "express";
const router = express.Router();
import leagueMembers from "../data/leagueMembers.js";


router.get('/', (req, res) => {
    res.json(leagueMembers);
});

router.get('/:id', (req, res) => {
    const leagueMember = leagueMembers.find(m => m.id == req.params.id);
    res.json(leagueMember);
});

export default router;