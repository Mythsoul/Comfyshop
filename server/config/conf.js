import dotenv from "dotenv"; 

dotenv.config(); 

const conf = { 
    AppwriteUrl : process.env.Appwrite_Endpoint_Url, 
    Appwrite_projectid : process.env.Appwrite_Project_Id, 
    Appwrite_Bucketid : process.env.Appwrite_Bucket_Id,
    AppwriteApiKey: process.env.AppwriteApiKey

}

export default conf; 