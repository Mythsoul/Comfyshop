import dotenv from "dotenv";

dotenv.config();

export const conf = { 
    AppwriteUrl: process.env.APPWRITE_URL,
    Appwrite_projectid: process.env.APPWRITE_PROJECT_ID,
    AppwriteApiKey: process.env.APPWRITE_API_KEY,
    Appwrite_Bucketid: process.env.APPWRITE_BUCKET_ID
};