const db = require("../utils/databaseConnection");

module.exports = {

    getAllPosts: async (req,res,next) =>{
        try {
            db.connection.query("SELECT * FROM posts", (error,results) =>{
                if(!results){
                    return res.status(404).json({ message: "Posts not found!"});
                }else{
                    //console.log("The Posts found are: "+JSON.stringify(results));
                    res.status(200).json(results);
                }
            });
        } catch (error) {
            return next(error);
        }
    },

    storePost: async(pTitle,pBody,uID,req,res,next) => {
        try {
            db.connection.query("INSERT INTO posts (title,body,user_id) VALUES (?,?,?)",[pTitle,pBody,uID], async (error,results) =>{
                if(error){
                    return next(error);
                }else{
                    return res.status(201).json({ message: "Post Saved successfully!"});
                }
            });
        } catch (error) {
            return next(error);
        }
    },

    deleteUserPost: async(pID,uID,req,res,next) =>{
        try {
            db.connection.query("DELETE FROM posts where id = ? AND user_id = ?",[pID,uID], async (error,results) =>{
                if(error){
                    return next(error);
                }else{
                    res.status(200).json({ message: "Post deleted!" });
                }
            });
        } catch (error) {
            return next(error);
        }
    },

}