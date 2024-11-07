const BLOG=require("../models/blog");
const COMMENT=require("../models/comments");

async function addNew(req,res){
    try{
        const {title,body}=req.body;
        if(!title || !body)return res.render("addBlog", { error: "title and body is required" });
        const createdBy = req.user._id;
        const blogData = {
            title,
            body,
            createdBy
        };
        // Check if req.file exists, otherwise omit coverImageUrl
        if (req.file && req.file.filename) {
            blogData.coverImageUrl = `/uploads/${req.file.filename}`;
        }
        const blog=await BLOG.create(blogData);
        return res.redirect(`/blog/${blog._id}`);
    }catch(error){
        console.log(`some error in blog creation :${error}`);
        res.status(500).render("addBlog", { error: "error creating new blog" });
    }
}

async function renderBlog(req, res) {
  try {
    const blog = await BLOG.findOne({ _id: req.params.id })
      .populate("createdBy", "fullName profileImageUrl");
    const comments = await COMMENT.find({ createdOnBlog: req.params.id })
      .populate("createdBy", "fullName profileImageUrl")
      .sort({ createdAt: -1 });
    res.render("blog", {
      blog,
      user: req.user,
      comments,
    });
  } catch (error) {
    console.log(`some error in rendering blog :${error}`);
    res.status(500).render("error", { error: "Error loading blog" });
  }
}

async function createComment(req, res) {
  try {
    const { content } = req.body;
    const createdBy = req.user._id;
    const createdOnBlog = req.params.id;

    if (!content) return res.redirect(`/blog/${req.params.id}`);
    const comment = await COMMENT.create({ content, createdBy, createdOnBlog });
    return res.redirect(`/blog/${req.params.id}`);
  } catch (error) {
    console.log(`some error in rendering blog :${error}`);
    res.render("blog", { error: "some error while creating the comment" });
  }
}

module.exports={addNew,renderBlog,createComment};