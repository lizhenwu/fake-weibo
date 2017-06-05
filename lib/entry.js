var mongoose = require('mongoose');
var msgSchema = new mongoose.Schema({
    name:String,
    msg:String,
    title:String
},{collection:"msg"});

export default mongoose.model('userMsg',msgSchema);