import mongoose from 'mongoose';
import entry from '../lib/entry';
import express from 'express';
const router = express.Router();

router.post('/',(req,res,next)=>{
    entry.create({
        name: res.locals.user.name,
        msg:req.body.msg,
        title:new Date()
    },(err)=>{
        if(err) next(err);
        res.redirect('/');
    })
});
export default router;

