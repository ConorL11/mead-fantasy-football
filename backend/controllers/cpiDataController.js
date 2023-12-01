import asyncHandler from '../middleware/asyncHandler.js';
import cpiDataModel from '../models/cpiDataModel.js';


//@desc Fetch every week from the cpiData
//@route GET /api/cpidata
//@access Public
const getCpiData = asyncHandler(async (req, res) => {
    const cpiData = await cpiDataModel.find({});
    res.json(cpiData);
});

//@desc Fetch a week 
//@route GET /api/cpidata/:week
//@access Public
//Conor - insert logic for retrieving cpi data by week here?
export { getCpiData};