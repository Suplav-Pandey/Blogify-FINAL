const express=require("express");
const connectMongoDb = require("./connection");
const {resolve}=require("path");
const userRoute = require("./routes/user");

const app=express();
const PORT=3000;
connectMongoDb("mongodb://127.0.0.1:27017/BLOGIFY");

app.set("view engine","ejs");
app.set("views",resolve("./views"));

app.use(express.urlencoded({extended :false}));
app.use(express.json());

app.use("/user",userRoute);
app.get("/",(req,res)=>{res.render("home")});

app.listen(PORT,()=>console.log(`server started at port : ${PORT}`));


//user login and registration and many related is done .