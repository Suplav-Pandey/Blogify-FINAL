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

function profileGet(req,res){
    res.render("profile",{user:req.user});
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
        res.cookie("token",token,{maxAge: 30*24*60*60*1000}).status(200).render("home",{message:`user ${user.fullName} has successfully Logined`,user});
    }catch(error){
        console.log(`ERROR WHILE LOGGINING THE USER : ${error}`);
        res.status(500).render("login",{error:"some internal server error"});
    }
}

async function registerPost(req,res){
    try{  
        const {fullName,email,password} =req.body;
        if(!fullName || !email || !password)return res.render("register",{error:"all fields are required"});  
        const user=await USER.create({fullName,email,password});
        const token= jwtSign(user);//token is created.
        res.cookie("token",token,{maxAge: 30*24*60*60*1000}).status(201).render("home",{message:`user ${fullName} has successfully Registered`,user});//jhol h------------
    }catch(error){
        console.log(`ERROR WHILE REGISTERING THE USER : ${error}`);
        res.status(500).render("register",{error:"some internal server error"});
    }
}

async function profilePost(req, res) {
    try {
      const { new_userName } = req.body;
      const userId = req.user._id;
      const user = await USER.findOne({ _id: userId });

      if (req.file && req.file.filename) {
        user.profileImageUrl = `/uploads/${req.file.filename}`;
      }
      if (new_userName && user.fullName !== new_userName) {
        user.fullName = new_userName;
      }
      await user.save();
      const token= jwtSign(user);//token is created.
      res.cookie("token",token,{maxAge: 30*24*60*60*1000}).status(201).render("home", { message: `User ${user.fullName} updated successfully`, user });
    } catch (error) {
      console.error(`Error while updating the user: ${error}`);
      res.status(500).render("profile", { error: "Some internal server error" });
    }
}


module.exports={loginGet,registerGet,loginPost,registerPost,logout,profileGet,profilePost};