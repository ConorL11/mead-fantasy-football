import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

import leagueMembers from "./data/leagueMembers.js";
import LeagueMember from "./models/leagueMembersModel.js";

import cpiDataModel from "./models/cpiDataModel.js";
import cpiData from "./data/cpiData.js";

import connectDB from "./config/db.js";

dotenv.config();
connectDB();

// // cpiData Seeder Functions
// const importData = async () => {
//     try {
//         await cpiDataModel.deleteMany();
//         const createdData = await cpiDataModel.insertMany(cpiData);
//         console.log('Data Imported!'.green.inverse);
//         process.exit();
//     } catch (error) {
//         console.log(`${error}`.red.inverse);
//         process.exit(1);
//     }
// }

// const destroyData = async () => {
//     try {
//         await cpiDataModel.deleteMany();
//         console.log('Data Destroyed!'.red.inverse);
//         process.exit();
//     } catch (error) {
//         console.log(`${error}`.red.inverse);
//         process.exit(1);
//     }
// }

// League Member Seeder Functions
const importData = async () => {
    try {
        await LeagueMember.deleteMany();
        const createdMembers = await LeagueMember.insertMany(leagueMembers);
        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        await LeagueMember.deleteMany();
        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
}

if(process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}