const {Schema,model}=require("mongoose");

const commentSchema = Schema({
    content: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "USER",
    },
    createdOnBlog: {
      type: Schema.Types.ObjectId,
      ref: "BLOG",
    },
  }, {timestamps:true});

const COMMENT=model("COMMENT",commentSchema);

module.exports=COMMENT;
