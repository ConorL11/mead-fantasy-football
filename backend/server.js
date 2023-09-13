import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cpiData from './data/cpiData.js';

const port = process.env.PORT || 5000;

const app = express();

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.get('/api/cpiData', (req, res) => {
    res.json(cpiData);
});

// This didn't work. Need to troubleshoot to be able to request data based on the week. 
app.get('/api/cpiData/:week', (req, res) => {
    const weeklycpiData = cpiData.find(week => week.week == req.params.week)?.data || null;
    res.json(weeklycpiData);
});

app.listen(port, () => console.log(`Server running on port ${port}`));