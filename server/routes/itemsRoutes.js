import express from "express"; 
import { getItems, createItem } from "../controllers/Itemcontroller.js";
import { ensureAuthenticated } from "../middleware/authMiddleware.js";
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router(); 

router.get("/api/getitems", getItems);
router.post("/api/createItem", upload.single('image'), createItem);
// router.put('/:id', upload.single('image'), updateItem);
// router.delete('/:id', deleteItem);
export default router;