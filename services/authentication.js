const {sign,verify}=require("jsonwebtoken");
const {randomBytes}=require("crypto");
const SECRET=randomBytes(16).toString("hex");

async function jwtSign(name,email){
    try{
        const payload={name,email};
        const token =await sign(payload,SECRET);
        console.log(`the token created is : ${token}`);
        return token;
    }catch(error){
        console.log(`error while creating jwt token : ${error}`);
    }
}

async function jwtVerify(token){
    try{
        const payload =await verify(token,SECRET);
        console.log(`the token verified is : ${payload}`);
        return payload;
    }catch(error){
        console.log(`error while verifying jwt token : ${error}`);
    }
}

module.exports={jwtSign,jwtVerify};