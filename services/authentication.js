const {sign,verify}=require("jsonwebtoken");
const {randomBytes}=require("crypto");
const SECRET=randomBytes(16).toString("hex");

function jwtSign(user){
    try{
        const payload={
            _id: user._id,
            email: user.email,
            role : user.role,
            profileImageUrl : user.profileImageUrl
        };
        const token = sign(payload, SECRET);
        console.log(`the token created is : ${token}`);
        return token;
    }catch(error){
        console.log(`error while creating jwt token : ${error}`);
    }
}

function jwtVerify(token){
    try{
        const payload =verify(token, SECRET);
        console.log(`the token verified is : ${payload}`);
        return payload;
    }catch(error){
        console.log(`error while verifying jwt token : ${error}`);
    }
}

module.exports={jwtSign,jwtVerify};