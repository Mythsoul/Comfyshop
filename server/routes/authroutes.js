import express from "express"; 

import { login, registerUser } from "../controllers/authcontroller.js";

    
const router = express();

router.post("/api/register" , registerUser); 
router.post("/api/login" , login) ;


export default router; 