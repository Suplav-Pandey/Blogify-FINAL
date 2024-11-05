const { jwtVerify } = require("../services/authentication");

function checkAuthentication(authToken) {
    return (req, res, next) => {
        const cookieToken = req.cookies[authToken];
        if (!cookieToken) return next();
        try {
            const payload = jwtVerify(cookieToken); // Use cookieToken here
            const user = JSON.stringify(payload);
            console.log(`The token verified: ${user}`);
            req.user=user;
        } catch (error) {
            console.error(error); // Optional: log the error
        }
        next();
    };
}

module.exports = checkAuthentication;
