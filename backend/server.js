import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import leagueMemberRoutes from './routes/leagueMemberRoutes.js';
import cpiDataRoutes from './routes/cpiDataRoutes.js';
const port = process.env.PORT || 4000;

connectDB(); // Connect to MongoDB

const app = express();

app.get('/', (req, res) => {
    res.send('API is running...');
});


app.use('/api/leagueMembers', leagueMemberRoutes);
app.use('/api/cpiData', cpiDataRoutes);


app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));