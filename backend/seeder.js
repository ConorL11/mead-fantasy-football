import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

import leagueMembers from "./data/leagueMembers.js";
import LeagueMember from "./models/leagueMembersModel.js";

import cpiDataModel from "./models/cpiDataModel.js";
import cpiData from "./data/cpiData.js";

import Season from "./models/seasonsModel.js";
import seasons from "./oldDataTransform.js";

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

// // // League Member Seeder Functions
// const importData = async () => {
//     try {
//         await LeagueMember.deleteMany();
//         const createdMembers = await LeagueMember.insertMany(leagueMembers);
//         console.log('Data Imported!'.green.inverse);
//         process.exit();
//     } catch (error) {
//         console.log(`${error}`.red.inverse);
//         process.exit(1);
//     }
// }

// const destroyData = async () => {
//     try {
//         await LeagueMember.deleteMany();
//         console.log('Data Destroyed!'.red.inverse);
//         process.exit();
//     } catch (error) {
//         console.log(`${error}`.red.inverse);
//         process.exit(1);
//     }
// }

// Seasons Seeder Functions
const importData = async () => {
    try {
        await Season.deleteMany();
        const createdSeasons = await Season.insertMany(seasons);
        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        await Season.deleteMany();
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



// // Conor Testing - Attept at cleaner code for seeder function
// //Manually set what db we are importing into with the importSetting variable
// const importSetting = 'cpiData';

// if(importSetting === 'cpiData'){
//     let dataModel = cpiDataModel;
//     let data = cpiData;
// }

// if(importSetting === 'leagueMembers'){
//     let dataModel = LeagueMember;
//     let data = leagueMembers;
// }

// if(importSetting === 'seasons'){
//     let dataModel = Season;
//     let data = seasons;
// }


// const importData = async () => {
//     try {
//         await dataModel.deleteMany();
//         const createdData = await dataModel.insertMany(data);
//         console.log('Data Imported!'.green.inverse);
//         process.exit();
//     } catch (error) {
//         console.log(`${error}`.red.inverse);
//         process.exit(1);
//     }
// }

// const destroyData = async () => {
//     try {
//         await dataModel.deleteMany();
//         console.log('Data Destroyed!'.red.inverse);
//         process.exit();
//     } catch (error) {
//         console.log(`${error}`.red.inverse);
//         process.exit(1);
//     }
// }