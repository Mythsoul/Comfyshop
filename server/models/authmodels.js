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


export async function checkAccAvailibilty(email){ 
    try{ 
     const response =await db.query("Select * from users where email=$1" , [email]); 
     if(response.rows && response.rows.length > 0){ 
        return false;
     }
     return true;
    }catch(err){ 
        console.log(err); 
        throw new Error("An error occured while checking the account avaibility"); 
    }
}
