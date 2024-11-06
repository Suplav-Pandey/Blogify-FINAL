const {Router}=require("express");
const {loginGet,registerGet,loginPost,registerPost,logout}=require("../controllers/user");
const userRoute=Router();

userRoute.get("/login",loginGet);
userRoute.get("/register",registerGet);
userRoute.post("/login",loginPost);
userRoute.post("/register",registerPost);
userRoute.get("/logout",logout);

module.exports=userRoute;