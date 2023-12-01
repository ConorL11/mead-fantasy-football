import asyncHandler from '../middleware/asyncHandler.js';
import LeagueMember from '../models/leagueMembersModel.js';


//@desc Fetch all League Members
//@route GET /api/leagueMembers
//@access Public
const getLeagueMembers = asyncHandler(async (req, res) => {
    const leagueMembers = await LeagueMember.find({});
    res.json(leagueMembers);
});

//@desc Fetch a League Member
//@route GET /api/leagueMembers/:id
//@access Public
const getLeagueMemberById = asyncHandler(async (req, res) => {
    const leagueMember = await LeagueMember.findById(req.params.id);
    if(leagueMember){
        res.json(leagueMember);
    }  else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

export { getLeagueMembers, getLeagueMemberById};