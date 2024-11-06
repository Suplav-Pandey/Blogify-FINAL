const {Schema,model}=require("mongoose");

const blogSchema=Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true,
    },
    coverImageUrl:{
        type:String,
        default:"/public/images/default_coverImage.jpeg"
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"USER"
    }
},{timestamps:true});

const BLOG=model("BLOG",blogSchema);

module.exports=BLOG;