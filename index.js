const express=require("express");
const {resolve}=require("path");
const cookieParser = require('cookie-parser');
const connectMongoDb = require("./connection");
const checkAuthentication = require("./middleware/authentication");
const homeRoute = require("./routes/home");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");

const app=express();
const PORT=3000;
connectMongoDb("mongodb://127.0.0.1:27017/BLOGIFY");

app.set("view engine","ejs");
app.set("views",resolve("./views"));

app.use(express.urlencoded({extended :false}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(`./public/`));

//custom middleware
app.use(checkAuthentication("token"));

//my custom routes
app.use("/user",userRoute);
app.use("/blog",blogRoute);
app.get("/",homeRoute);

app.listen(PORT,()=>console.log(`server started at port : ${PORT}`));
