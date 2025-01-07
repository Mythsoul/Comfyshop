import bcrypt from "bcrypt"; 
import {database as db} from "../config/db.js"; 


// thodi der me aaya me 

export async function registerUser(email , password) { 
    const saltRounds = "10"; 
    try{ 
      const hashedPassword = hashPassword(password , saltRounds);
      const registerUser = await db.query("insert into users(email, password) values ($1, $2) returning *", [email, hashedPassword]);
      if(registerUser.rows > 0 ){ 
        return "User is sucessfully registered"
      }

  }catch(err){ 
    console.log(err); 
    throw err ; 
  }
}


export function hashPassword(password){ 
    const saltRounds = 10; 
    console.log(bcrypt.hash(password , 10 )); 
    return bcrypt.hash(password , 10); 
}