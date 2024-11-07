const { jwtVerify } = require("../services/authentication");

function checkAuthentication(authToken) {
    return (req, res, next) => {
        const cookieToken = req.cookies[authToken];
        if (!cookieToken) return next();
        try {
            const payload = jwtVerify(cookieToken); // Use cookieToken here
            req.user=payload;
        } catch (error) {
            console.error(`some error in tokenAuth :${error}`); // Optional: log the error
        }
        next();
    };
}

module.exports = checkAuthentication;
