const { Comment } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');


module.exports = {  //I don't see where we would use this
    async getAllComments(req, res) {
        const comments = await Comment.find();
        return res.json(comments);
        
    }
    // async getCommentsByPost(req, res) {
    //     const comments = await Comment.find();
    //     return res.json(comments);
        
    // }


//get comments by userId    (see your comments... or other users... maybe on profile?)

//get comments by postId    (see posts comments)

};