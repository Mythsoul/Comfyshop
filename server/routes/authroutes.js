import express from "express"; 

import { registerUser } from "../controllers/authcontroller.js";

const router = express();

router.post("/api/register" , registerUser); 


export default router; 