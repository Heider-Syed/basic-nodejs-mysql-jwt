const postsModel = require("../models/posts.model");

const authMiddlewareData = require("../middleware/auth.middleware");

exports.fetchAllPosts = async (req,res,next) => {
    await postsModel.getAllPosts(req,res,next);
};

exports.newPost = async (req,res,next)=>{
    const userID = authMiddlewareData.decodedID;
    const {postTitle,postBody} = req.body;

    if(!postTitle || !postBody){
        res.status(400).json({message:"Please provide all the data to make a new post"});
    }else{
        if( postTitle.length < 7 || postBody.length < 7 ){
            return res.status(400).json({message:"Please provide a title and body bigger than 6 characters"})
        }else{
            await postsModel.storePost(postTitle,postBody,userID,req,res,next);
        }
    }
};

exports.deletePost = async (req,res,next)=>{
    const postID = req.params.id;
    const userID = authMiddlewareData.decodedID;

    if(!postID){
        return res.status(400).send("Please provide the post id to delete!");
    }else{
        await postsModel.deleteUserPost(postID,userID,req,res,next);
    }
};