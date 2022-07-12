import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    description: String,
    tags: [String],
    selectedFile: String,

});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;