const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

router.post('/login', function (req, res,next) {
    //console.log("req.body",req.body)
    controller.login(req.body.username,req.body.password)
        .then(data => {
            //console.log("----------------------",data)  
            const expiresIn = 60 * 60* 3 * 1000;
            const options = {maxAge: expiresIn, httpOnly: true};
            res.cookie('token', data.token, options);
            response.success(req, res, data.id, 200);
        })
        .catch(next);
})

router.get('/logout', function (req, res,next) {
    console.log(req.cookies)
    res.clearCookie('token')
    response.success(req, res,"", 200);
})




module.exports = router;