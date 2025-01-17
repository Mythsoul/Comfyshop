import express from "express"; 
import { login, logout, registerUser, isAuthenticated } from "../controllers/authcontroller.js";
import { forwardAuthenticated , ensureAuthenticated } from "../middleware/authMiddleware.js";

const router = express();

router.post("/api/register", forwardAuthenticated, registerUser); 
router.post("/api/login", forwardAuthenticated, login);
router.get("/api/isAuthenticated", isAuthenticated);
router.get("/api/logout",ensureAuthenticated, logout);

export default router;