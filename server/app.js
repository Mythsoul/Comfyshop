import express from "express";
import dotenv from "dotenv"; 
import authRoutes from "./routes/authRoutes.js"; // Adjust the path as necessary
import bodyParser from "body-parser";
import rateLimit from "express-rate-limit";
import session from "express-session";
import cors from "cors"; // Import cors
import cookieParser from "cookie-parser";

dotenv.config(); 
const app = express(); 
const port = process.env.PORT || 3000; 

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, // Increase the limit for testing
});

app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true
}));
app.use(cookieParser());

// Configure session middleware
app.use(session({
    secret: 'your_secret_key', // Replace with your secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

app.use(authRoutes);

app.listen(port , ()=>{ 
    console.log(`Server is running on port ${port}`);
});