const {Router}=require("express");
const {loginGet,registerGet,loginPost,registerPost}=require("../controllers/user");
const userRoute=Router();

userRoute.get("/login",loginGet);
userRoute.get("/register",registerGet);
userRoute.post("/login",loginPost);
userRoute.post("/register",registerPost);

module.exports=userRoute;