const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');

const secret = config.jwt.secret;

function sign(data) {
    return jwt.sign(data, secret,{expiresIn:'3h'});
}

function verify(token) {
    return jwt.verify(token, secret)
}

const check = {
    own: function (req, owner) {

         const decoded = decodeHeader(req);
        //console.log(decoded);

       // console.log(decoded.username + '!==' + owner)
        
        if (decoded.username !== owner) {
            throw error('No puedes hacer esto', 401);
        }
    },

    logged: function (req) {
        //console.log("coookie -"+req.cookies.token)
        //const decoded = verify(req.cookies.token)
        console.log(decoded)
        req.user = decoded;
    },
}

function getToken(token) {
    if (!token) {
        throw error('No viene token', 401);
    }
    /*
    if (auth.indexOf('Bearer ') === -1) {
        throw error('Formato invalido', 401);
    }
    */

    //let token = auth.replace('Bearer ', '');

    return token;
}

function decodeHeader(req) {

    //const authorization = req.headers.authorization || '';
    //const token = getToken(authorization);
    //const decoded = verify(token);
    const token = getToken(req.cookies.token);
    const decoded = verify(token)

    req.user = decoded;

    return decoded;
}

module.exports = {
    sign,
    check,
};
