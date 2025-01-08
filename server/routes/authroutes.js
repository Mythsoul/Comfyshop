import express from "express"; 
import { login, registerUser } from "../controllers/authcontroller.js";
import isAuthenticated from "../middleware/authMiddleware.js";

const router = express();

router.post("/api/register" , registerUser); 
router.post("/api/login" , login);

router.get("/api/protected", isAuthenticated, (req, res) => {
    res.send('This is a protected route');
});

export default router;