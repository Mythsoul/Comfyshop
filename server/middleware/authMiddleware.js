
export const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).send('Not authenticated');
    }
};

// Middleware to forward authenticated users
export const forwardAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return next();
    } else {
        return res.redirect('/');
    }
} 