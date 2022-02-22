import express from 'express';
import cors from 'cors';
import db from './db/db.js';
import dotenv from 'dotenv';

import roleRoute from './routes/role.js';
import user from './routes/user.js';
import task from './routes/task.js';

dotenv.config();

const APP = express();
APP.use(express.json());
APP.use(cors());
//Nuestra app va a usar
APP.use("/api/role", roleRoute);
APP.use("/api/user", user);
APP.use("/api/task", task);

APP.listen(process.env.PORT, ()=>{
    console.log("Backend server running on port",process.env.PORT);
});

db.dbConnection();