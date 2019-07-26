const jwt = require('jsonwebtoken');


const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send("Access denied, please login first...");

    try { 
        const decoded = jwt.verify(token, 'jwtPrivateKey');
        req.user = decoded;
        next();
    }
    catch (ex) {
        res.status(401).send('Please login with correct credentials...');
}

}
module.exports = auth;