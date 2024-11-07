const {Router}=require("express");
const BLOG = require("../models/blog");
const homeRoute=Router();

homeRoute.get("/",async (req,res)=>{
    const blogs=await BLOG.find({}).sort({ createdAt: -1 });
    res.render("home",{user:req.user ,blogs})
});
module.exports=homeRoute;

//may be