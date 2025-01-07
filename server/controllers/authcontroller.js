import express from "express"; 
import dotenv from "dotenv"; 
import {database as db} from "../config/db.js"
import bcrypt from "bcrypt"
import { hashPassword } from "../models/authmodels.js";
dotenv.config(); 

// ok now i forgot : > 

export const login = async(req , res)=>{  
 const {Email , Password} = req.bod; 
 const saltRounds = "10"; 
 try{ 
    const response = await db.query("select * from users where Email = $1 and password = $2" , [Email  , Password]); 
    if(response.rows === 0 ){ 
        return res.json("No User found"); 
    }
    const userpassword = Password; 
    const userhashedPassword = bcrypt.hash(userpassword , saltRounds); 
    // project karle na mene to alag na sikha and mereko aata bhi nahi utna bas basics aate udemy ka course tha ig and youtube se  ha udemy me thi ak angelia kuch karke 
    const hashedPassword = response.rows[0].password; 
    const checkcorrectness =await bcrypt.compare(hashedPassword , userhashedPassword); 
    if(checkcorrectness){ 
        console.log("user is authenticated ")
    }else{ 
        console.log("user is not logged in cause the data mismatched : > "); 
    }
 }catch(err){
    throw err; 
 }
}


export const registerUser = async(req , res)=>{ 
    console.log(req.body);
    const {email , password } = req.body;
    try{ 
        const hashedpassword = hashPassword(password); 
        const response = await db.query("insert into users(email , password) values ($1 , $2) returning *" , [email , hashedpassword]);
        if(response.rows  > 0 ){ 
            return res.json("User is successfully registered");
        }else{ 
            return res.json("An error occured while registering the use"); 

        }
    }catch(err){ 
        throw err; 
    }
}

/// abhi aaya hu afkk tha 