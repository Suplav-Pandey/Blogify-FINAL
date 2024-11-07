const {Router}=require("express");
const { addNew,renderBlog ,createComment} = require("../controllers/blog");
const upload = require("../utilities/multer");
const blogRoute=Router();

blogRoute.get("/",(req,res)=>{res.render("addBlog",{user:req.user})});
blogRoute.post("/AddNew",upload.single('file'),addNew);
blogRoute.get(`/:id`,renderBlog);
blogRoute.post("/comment/:id",createComment);
//show all blogs created by user on / route.

module.exports=blogRoute;


//may be