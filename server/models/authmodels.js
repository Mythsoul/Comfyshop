import bcrypt from "bcrypt";
import { database as db } from "../config/db.js";


// thodi der me aaya me 


export async function hashPassword(password) {
    try {
        const saltRounds = 10;
        console.log(password)
        return await bcrypt.hash(password, saltRounds)
    } catch (err) {
        throw err;
    }
}

