import pg from "pg";
import dotenv from "dotenv";
dotenv.config(); 

// Check if all required environment variables are defined
const requiredEnvVars = ['DB_USER', 'DB_HOST', 'DB_NAME', 'DB_PASSWORD', 'DB_PORT'];
requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
        throw new Error(`Environment variable ${varName} is not defined`);
    }
});

export const database = new pg.Pool({
    user : String(process.env.DB_USER), 
    host : String(process.env.DB_HOST),
    database : String(process.env.DB_NAME),
    password : String(process.env.DB_PASSWORD),
    port : Number(process.env.DB_PORT),
    ssl : { 
        rejectUnauthorized: false
    }// Disable SSL
});

database.connect((err) => {
    if (err) {
        console.error('Failed to connect to database', err);
    } else {
        console.log("Connected to database");
    }
});

// Add error event listener to handle unexpected connection termination
database.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});
