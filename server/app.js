import express from "express";
import dotenv from "dotenv"; 
import authRoutes from "./routes/authRoutes.js"; // Adjust the path as necessary
import bodyParser from "body-parser";
import rateLimit from "express-rate-limit";
import session from "express-session";
import cors from "cors"; // Import cors
import cookieParser from "cookie-parser";
import itemRoutes from './routes/itemsRoutes.js'; 

dotenv.config(); 
const app = express(); 
const port = process.env.PORT || 3000; 

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: "Too many requests from this IP, please try again after 15 minutes"
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
    secret: 'just a random secret', 
    resave: false,
    saveUninitialized: false, // Change to false to avoid saving uninitialized sessions
    cookie: { 
        secure: false, // Set to true if using HTTPS
        httpOnly: true, // Ensure the cookie is only accessible via HTTP(S)
        maxAge: 1000 * 60 * 60 * 24 // Set cookie expiration time (e.g., 1 day)
    } 
}));

app.use(authRoutes);
app.use(itemRoutes); 

app.listen(port , ()=>{ 
    console.log(`Server is running on port ${port}`);
});