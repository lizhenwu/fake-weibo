var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var userSchema = new mongoose.Schema({
    name:{
        unique:true,
        type:String
    },
    password:{
        unique:true,
        type:String
    }
},{collection:"user"});
userSchema.pre('save',function(next){
    var user = this;
    bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
        if(err) return next(err);
        bcrypt.hash(user.password,salt,function(err,hash){
            if(err) return next(err);
            user.password = hash;
            next();
        });
    });
});
userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
module.exports = mongoose.model('UserBox',userSchema);
// var user = new UserBox({
//     name:"Jack",
//     password:"123456"
// });
// user.save(function(err,user){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("password:"+user.password);
//     }
// });
