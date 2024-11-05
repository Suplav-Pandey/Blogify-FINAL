const {sign,verify}=require("jsonwebtoken");
const {randomBytes}=require("crypto");
const SECRET="suplavIsA-GoodEngineer";

function jwtSign(user){
    try{
        const payload={
            _id: user._id,
            name : user.fullName,
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
    return verify(token, SECRET);
}

module.exports={jwtSign,jwtVerify};