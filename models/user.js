const {Schema,model}=require("mongoose");
const {createHmac , randomBytes }=require("crypto");

const userSchema=Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    salt:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["admin","normal"],
        default:"normal"
    },
    profileImageUrl:{
        type:String,
        default:"./public/images/default.jpeg",
    }
});

userSchema.pre('save',function(next){
    const user=this;
    if(!user.isModified("password"))next();

    const salt= randomBytes(16).toString();
    const password=createHmac("sha256",salt).update(user.password).digest("hex");

    this.password=password;
    this.salt=salt;
    next();
})

const USER=model("USER",userSchema);

module.exports=USER;