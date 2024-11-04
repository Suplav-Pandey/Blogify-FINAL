const USER=require("../models/user");
const { createHmac }=require("crypto");
const { jwtSign } = require("../services/authentication");

function loginGet(req,res){
    res.render("login");
}
function registerGet(req,res){
    res.render("register");
}

async function loginPost(req,res){
    //do login + insert cookie for authorization
    const {email,password}=req.body;
    if(!email || !password)throw new Error("all fields are required");
    try{
        const user= await USER.findOne({email});
        if(!user)throw new Error("either email or password is incorect");
        const storedPassword= user.password;
        const salt=user.salt;
        const hashedPassword= createHmac("sha256",salt).update(password).digest("hex");
        if(storedPassword !== hashedPassword)throw new Error("either email or password is incorect");
        //if we reach at this point that means email and password is correct now login user.
        const name=user.fullName;
        const token= await jwtSign(name,email);//token is created.
        res.cookie("uid",token).render("home");
    }catch(error){
        console.log(`ERROR WHILE LOGGINING THE USER : ${error}`);
    }
}

async function registerPost(req,res){
    const {fullName,email,password} =req.body;
    // if(!fullName || !email || !password)throw new Error("all fields are required .");
    try{    
        await USER.create({fullName,email,password});
        console.log(`USER CREATED SUCCESSFULLY : ${fullName}`);
        const token= await jwtSign(fullName,email);//token is created.
        res.cookie("uid",token).render("home");
    }catch(error){
        console.log(`ERROR WHILE REGISTERING THE USER : ${error}`);
    }
}

module.exports={loginGet,registerGet,loginPost,registerPost};