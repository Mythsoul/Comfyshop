import express from "express"; 
import { login, logout, registerUser } from "../controllers/authcontroller.js";
import { forwardAuthenticated  , isAuthenticated} from "../middleware/authMiddleware.js";

const router = express();


router.post("/api/register", forwardAuthenticated, registerUser); 
router.post("/api/login", forwardAuthenticated, login);
router.get("/api/isAuthenticated", isAuthenticated);
router.get("/api/logout" , logout)
export default router;