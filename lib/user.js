var User = require('./userModel');
module.exports = function(req,res,next){
    var uid = req.session.uid;
    if(!uid) return next();
    User.findById(uid,function(err,user){
        if(err) return next();
        req.user = res.locals.user = user;
        next();
    });
}