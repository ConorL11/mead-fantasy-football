import asyncHandler from '../middleware/asyncHandler.js';
import Season from '../models/seasonsModel.js';


//@desc Fetch all League Members
//@route GET /api/seasons
//@access Public
const getSeasons = asyncHandler(async (req, res) => {
    const seasons = await Season.find({});
    res.json(seasons);
});

//@desc Fetch a League Member
//@route GET /api/seasons/:id
//@access Public
const getSeasonsById = asyncHandler(async (req, res) => {
    const season = await Season.find({season: req.params.id});
    if(season){
        res.json(season);
    }  else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

export { getSeasons, getSeasonsById };