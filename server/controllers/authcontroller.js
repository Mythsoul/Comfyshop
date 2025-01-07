import express from "express"; 
import dotenv from "dotenv"; 
import {database as db} from "../config/db.js"
import bcrypt from "bcrypt"
import { hashPassword } from "../models/authmodels.js";
dotenv.config(); 

export const login = async(req , res)=>{  
 const {email , password } = req.body; 
 try{ 
    const checkavailability = await db.query("select * from users where email = $1" , [email]);
    if(checkavailability.rows < 1) { 
        return res.json("User does not exist");
    }
    const userhashedpassword = checkavailability.rows[0].password;
    const checkpassword = await bcrypt.compare(password , userhashedpassword);   
    if(checkpassword){ 

        return res.json("User is successfully logged in");
    }else{ 
        return res.json("Incorrect password");
    }
 }catch(err){ 
    throw err;
 }
}

// Register user done : > 
export const registerUser = async(req , res)=>{ 
    const {email , password } = req.body; 
    try{ 
        const hashedpassword = await hashPassword(password)
        const response = await db.query("insert into users(email , password) values ($1 , $2) returning *" , [email , hashedpassword]);
        console.log(response.rows)
        if(response.rows  > 0 ){ 
            return res.json("User is successfully registered");
        }else{ 
            return res.json("An error occured while registering the use"); 

        }
    }catch(err){ 
        throw err; 
    }
}
