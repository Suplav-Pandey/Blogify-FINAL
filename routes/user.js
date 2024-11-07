const {Router}=require("express");
const {loginGet,registerGet,loginPost,registerPost,logout,profileGet,profilePost}=require("../controllers/user");
const upload = require("../utilities/multer");
const userRoute=Router();

userRoute.get("/login",loginGet);
userRoute.get("/register",registerGet);
userRoute.post("/login",loginPost);
userRoute.post("/register",registerPost);
userRoute.get("/logout",logout);
userRoute.get("/profile",profileGet);
userRoute.post("/profile",upload.single('file'),profilePost);
//show profile of user on / route

module.exports=userRoute;