const jwt  = require('jsonwebtoken');



const issLogedIn = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.redirect('/admin/');
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        // req.user = decoded; // Attach user data to request object
        req.id = user.id
        req.role = user.role
        req.fullname = user.fullname
        // console.log(req.id);
        next(); 
    } catch (error) {
        console.error('JWT verification failed:', error.message);
        res.clearCookie('token'); 
        res.redirect('/admin/');
    }
}


module.exports = issLogedIn;