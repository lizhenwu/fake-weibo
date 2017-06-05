var express = require('express');
var router = express.Router();
var User = require('../lib/userModel');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users');
router.get('/',function(req,res,next){
    res.render('register',{title:'Register'});
});
router.post('/',function(req,res,next){
    var formData = req.body;
    User.findOne({name:formData.userName},function(err,user){
        if(err) { console.log("err"); return next(err);}
        console.log(user);
        if(user){
            res.err("Username already taken!");
            // res.locals.removeMessages();
            res.redirect('back');
            
        }else{
            
            User.create({
                name:formData.userName,
                password:formData.userPass
            },function(err,doc){
                if(err) throw err;
                    req.session.uid = doc.id;
                    res.redirect('/');
            });
        }
    });
    // console.log(req.body.userName);
});

module.exports = router;