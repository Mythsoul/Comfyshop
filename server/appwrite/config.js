import { Client, Storage, ID } from 'node-appwrite';
import { conf } from '../config/conf.js';

const client = new Client()
    .setEndpoint(conf.AppwriteUrl)
    .setProject(conf.Appwrite_projectid)
    .setKey(conf.AppwriteApiKey);

export const storage = new Storage(client);
export const BUCKET_ID = conf.Appwrite_Bucketid;

export async function uploadImage(fileBuffer, fileName, fileId) {
    try {
        const file = new File([fileBuffer], fileName, {
            type: 'image/jpeg',
            lastModified: new Date().getTime()
        });
        
        const response = await storage.createFile(
            BUCKET_ID,
            fileId,
            file
        );
        
        // Verify the file was uploaded successfully
        const fileInfo = await storage.getFile(BUCKET_ID, fileId);
        if (!fileInfo) {
            throw new Error('File upload verification failed');
        }
        
        return response;
    } catch (err) {
        console.error("Error uploading file to Appwrite:", err);
        throw err;
    }
}

