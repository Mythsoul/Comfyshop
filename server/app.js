import express from "express";
import dotenv from "dotenv"; 
import authroutes from "./routes/authroutes.js";
import bodyParser from "body-parser";
import rateLimit from "express-rate-limit";
import session from "express-session";

dotenv.config(); 
const app = express(); 
const port = process.env.PORT || 3000; 


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 10, 
});

app.use(limiter);
app.use(bodyParser.json());

// Session configuration
app.use(session({
    secret: 'Just a normal secret key ',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

app.use(authroutes);


app.listen(port , ()=>{ 
    console.log(`Server is running on port ${port}`);
})