// to check if the user is authenticated, here clerk is handling the authentication -> 
export const protectRoute = async (req, res, next) => {
    if (!req.auth().isAuthenticated) {
        return res.status(401).json({ message: 'Unauthorized - you must be logged in' });
    }
    next();
}