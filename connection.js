const {connect}=require("mongoose");

async function connectMongoDb(url){
    try{
        await connect(url);
        console.log(`MongoDb connected successfully ..`);
    }catch(error){
        console.log(`error while connecting mongoDb : ${error}`);
    }
}

module.exports=connectMongoDb;