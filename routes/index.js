var express = require('express');
var router = express.Router();
var userMsg = require('../lib/entry');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users');
/* GET home page. */
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//     console.log('connection successful');
// });
router.get('/', function(req, res, next) {
  userMsg.find({},function(err,entries){
    res.render('index',{
    title:'Express',
    entries:entries
  });
  // db.close();
  });
});
router.get('/logout',function(req,res){
  req.session.destroy(function(err){
    if(err) throw err;
    res.redirect('/');
  });
});
router.get('/post',function(req,res){
  if(!req.session.uid){
    res.err('Please log in first.');
    res.redirect('/login');
  }else{
    res.render('post',{
      title:res.locals.user.name
    });
  };
});

module.exports = router;
