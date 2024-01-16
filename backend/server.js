import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import leagueMemberRoutes from './routes/leagueMemberRoutes.js';
import seasonsRoutes from './routes/seasonsRoutes.js';
import cpiDataRoutes from './routes/cpiDataRoutes.js';
const port = process.env.PORT || 5000;

connectDB(); // Connect to MongoDB
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/leagueMembers', leagueMemberRoutes);
app.use('/api/seasons', seasonsRoutes);

app.use('/api/cpiData', cpiDataRoutes);

const __dirname = path.resolve();
if(process.env.NODE_ENV === 'production'){
    // set static folder
    app.use(express.static(path.join(__dirname, '/frontend/build')));

    // any route that is not api will be redirected to index.html
    app.get("*", (req,res) => 
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    );

} else {
    app.get('/', (req, res) => {
        res.send('API is running...');
    });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));