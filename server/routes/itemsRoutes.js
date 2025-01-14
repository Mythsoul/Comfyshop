import express from "express"; 
import { getItems , createItem } from "../controllers/Itemcontroller.js";
import { ensureAuthenticated } from "../middleware/authMiddleware.js";
const router = express(); 

router.get("/api/items" , getItems);
router.post("/api/createItem" , ensureAuthenticated ,  createItem); 


export default router; 