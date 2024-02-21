import asyncHandler from '../middleware/asyncHandler.js';
import LeagueMember from '../models/leagueMembersModel.js';


//@desc Fetch all League Members
//@route GET /api/leagueMembers
//@access Public
const getLeagueMembers = asyncHandler(async (req, res) => {
    let query = LeagueMember.find();

    // Check if fields query parameter is present
    if (req.query.fields) {
        // Extract fields from the query parameter
        const fields = req.query.fields.split(',');

        // Select only the specified fields
        query = query.select(fields.join(' '));
    }

    const leagueMembers = await query.exec();
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