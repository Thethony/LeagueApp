const jwt = require('jsonwebtoken');
const Secret = "ProfileSecret";
function generateToken(email) {
    return jwt.sign(email, Secret);
}
function authenticateToken(req, res, next) {
    if (req.originalUrl.includes("/login") || req.originalUrl.includes("/signup") || req.originalUrl.includes("/home")) {
        next();
    }
    else {
        let token = null;
        if (req.cookies) {
            token = req.cookies.token;
        }
        if (token == null) {
            return res.redirect("/login");
        }
        if (token != null) {
            jwt.verify(token, Secret, (err, user) => {
                if (err && req.originalUrl != "/login") {
                    console.log(err);
                    return res.redirect("/login");
                } else {
                    req.user = user;
                }
            });
        }
        next();
    }
}
module.exports = {
    generateToken,
    authenticateToken
};