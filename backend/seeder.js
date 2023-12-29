import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

import leagueMembers from "./data/leagueMembers.js";
import LeagueMember from "./models/leagueMembersModel.js";

import cpiDataModel from "./models/cpiDataModel.js";
import cpiData from "./data/cpiData.js";

// import connectDB from "./config/db.js";

// File Path things

import { readFile } from 'fs/promises';
import fs from 'fs'
import path from "path";
import { existsSync } from "fs";

dotenv.config();
// connectDB();

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

// Historical Data Seeder Functions
const fetchHistoricalData = async () => {

    const currentDirectory = process.cwd();
    const filePath = process.cwd() + '/data/leagueData2015.json';


    if (fs.existsSync(filePath)) {
        console.log('The file exists.');
    } else {
        console.log('The file does not exist.');
    }

    // try {
    //     let data = JSON.parse(await readFile("./data/leagueData2015.json", "utf8"));
    //     console.log(data)
    // } catch(error) {
    //     console.log(`${error}`.red.inverse);
    //     process.exit(1);
    // }
}

if(process.argv[2] === '-d') {
    destroyData();
} else {
    // importData();
    fetchHistoricalData();
}