const auth = require('../../auth');
module.exports = function checkAuth(action) {
    function middleware(req, res, next) {
        
        switch (action) {
            case 'logged':
                console.log(req.cookies)
                auth.check.logged(req);
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