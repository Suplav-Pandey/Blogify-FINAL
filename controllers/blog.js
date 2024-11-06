const BLOG=require("../models/blog");

async function addNew(req,res){
    try{
        const {title,body}=req.body;
        const blog=await BLOG.create({
            title,
            body,
            createdBy:req.user._id,
            coverImageUrl:`/uploads/${req.file.filename}`
        });
        console.log(`the blog created: ${blog}`);
        return res.render(`/blog/${blog._id}`);
    }catch(error){
        console.log(`some error in blog creation :${error}`);
    }
}

module.exports={addNew};