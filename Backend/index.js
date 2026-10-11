const env = require("dotenv");
env.config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbconnect = require('./config/db.config');
const authrouter = require('./routes/auth.routes');

const app = express();

dbconnect();

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173'],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authrouter);

app.listen(3000, () => {
    console.log("server is running on port 3000");
});

