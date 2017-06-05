var express = require('express');
var router = express.Router();
var User = require('../lib/userModel');

router.get('/',function(req,res,next){
    res.render('login',{title:'Login'});
});
router.post('/',function(req,res,next){
    var userName = req.body.userName;
    var userPass = req.body.userPass;
    User.findOne({name:userName},function(err,user){
        if(err) return next(err);
        if(user){
            user.comparePassword(userPass,function(err,isMatch){
                if(err) return next(err);
                if(isMatch){
                    req.session.uid = user.id;
                    console.log(user.id);
                    res.redirect('/');
                }else{
                    res.err('Sorry! invalid credentials.');
                    res.redirect('back');
                }
            });
        }else{
            res.err("user doesn't exist,please sign up first.");
            res.redirect('back');
        }
    });
});

module.exports = router;