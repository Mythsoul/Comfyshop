export const forwardAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return next();
    } else {
       return res.status(200).json({ message: "User is already logged in" });
    }
} 