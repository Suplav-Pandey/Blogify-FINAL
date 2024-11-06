const USER=require("../models/user");
const { createHmac }=require("crypto");
const { jwtSign } = require("../services/authentication");

function loginGet(req,res){
    res.render("login");
}
function registerGet(req,res){
    res.render("register");
}

function logout(req,res){
    res.clearCookie("token").redirect("/");
}

async function loginPost(req,res){
    //do login + insert cookie for authorization
    try{
        const {email,password}=req.body;
        if(!email || !password)return res.render("login",{error:"all fields are required"});
        const user= await USER.findOne({email});
        if(!user)return res.render("login",{error:"either email or password is incorect"});
        const storedPassword= user.password;
        const salt=user.salt;
        const hashedPassword= createHmac("sha256",salt).update(password).digest("hex");
        if(storedPassword !== hashedPassword)return res.render("login",{error:"either email or password is incorect"});
        //if we reach at this point that means email and password is correct now login user.
        const token= jwtSign(user);//token is created.
        if(!token)return res.render("login",{error:"error while generating token"});
        
        res.cookie("token",token,{maxAge: 30*24*60*60*1000}).status(200).render("home",{message:`user ${user.fullName} has successfully Logined`,user:user});//jhol h -=--------
    }catch(error){
        console.log(`ERROR WHILE LOGGINING THE USER : ${error}`);
        res.status(500).render("login",{error:"some internal server error"});
    }
}

async function registerPost(req,res){
    try{  
        const {fullName,email,password} =req.body;
        if(!fullName || !email || !password)return res.render("register",{error:"all fields are required"});  
        await USER.create({fullName,email,password});
        console.log(`USER CREATED SUCCESSFULLY : ${fullName}`);
        const token= jwtSign(fullName, email);//token is created.
        res.cookie("token",token,{maxAge: 30*24*60*60*1000}).status(201).render("home",{message:`user ${fullName} has successfully Registered`,user:req.body});//jhol h------------
    }catch(error){
        console.log(`ERROR WHILE REGISTERING THE USER : ${error}`);
        res.status(500).render("register",{error:"some internal server error"});
    }
}

module.exports={loginGet,registerGet,loginPost,registerPost,logout};