import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import cpiData from './data/cpiData.js';

const port = process.env.PORT || 5000;

connectDB(); // Connect to MongoDB
const app = express();

app.get('/api/cpiData', (req, res) => {
    res.json(cpiData);
});

app.get('/api/cpiData/:week', (req, res) => {
    const weeklycpiData = cpiData.find(week => week.week == req.params.week)?.data || null;
    res.json(weeklycpiData);
});

// app.get('/', (req, res) => {
//     res.send('API is running...');
// });

const __dirname = path.resolve();
if(process.env.NODE_ENV === 'production'){
    // set static folder
    app.use(express.static(path.join(__dirname, '/frontend/build')));

    app.get("*", (req,res) => 
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    );
} else {
    app.get('/', (req, res) => {
        res.send('API is running...');
    });
}

app.listen(port, () => console.log(`Server running on port ${port}`));