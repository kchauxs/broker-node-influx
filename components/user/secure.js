const auth = require('../../auth'); 

module.exports = function checkAuth(action) {
    function middleware(req, res, next) {
        console.log(req.headers.authorization)
        switch (action) {
            case 'update':        
                const owner = req.body.id;
                auth.check.own(req, owner);
                next();
                break;

            case 'registers':
                auth.check.logged(req);
                next();
                break;

            default:
                next();
        }
    }

    return middleware;
}