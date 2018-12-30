var express = require('express');
var router = express.Router();
var {login,create,getAllUsers,isLoggedIn} = require('../controllers/user.controller');


router.post('/login', login);
router.post('/create', create);
router.get('/showusers', getAllUsers);
router.get('/test',isLoggedIn,function(req,res){
    res.send("hello world");
})

module.exports = router;
