const {Router}=require("express");
const { addNew } = require("../controllers/blog");
const upload = require("../utilities/multer");
const blogRoute=Router();

blogRoute.get("/",(req,res)=>{res.render("blog")});
blogRoute.post("/AddNew",upload.single('file'),addNew);

module.exports=blogRoute;