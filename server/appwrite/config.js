import { Client, Storage, Databases } from 'node-appwrite';
import conf from '../config/conf.js';
const client = new Client()
    .setEndpoint(conf.AppwriteUrl)
    .setProject(conf.Appwrite_projectid)
    .setKey(conf.AppwriteApiKey); 
export const storage = new Storage(client);
export const BUCKET_ID = conf.Appwrite_Bucketid;

