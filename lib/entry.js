var mongoose = require('mongoose');
var msgSchema = new mongoose.Schema({
    name:String,
    msg:String,
    title:String
},{collection:"msg"});

module.exports = mongoose.model('userMsg',msgSchema);