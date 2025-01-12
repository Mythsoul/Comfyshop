import express from "express"; 
import { getItems , createItem } from "../controllers/Itemcontroller.js";
const router = express(); 

router.get("/api/items" , getItems);
router.post("/api/createItem" , createItem); 


export default router; 