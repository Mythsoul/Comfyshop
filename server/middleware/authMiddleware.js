
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).send('Not authenticated');
    }
};

export default isAuthenticated;