const { Comment } = require('../models');
// import sign token function from auth


module.exports = {  //I don't see where we would use this
    async getAllComments(req, res) {
        const comments = await Comment.find();

        if (!comments) {
            return res.status(400).json({ message: 'Something is wrong!' });
        }

        return res.json(comments);

    },
    // async getCommentsByPost(req, res) {
    //     const comments = await Comment.find();
    //     return res.json(comments);

    // }


    //get comments by userId    (see your comments... or other users... maybe on profile?)


    async getCommentsByUser(req, res) { //needs testing
        console.log("**");
        console.log(req.params);
        console.log("**");
        
            const foundComments = await Comment.find({  //this refuses to find anything except all or nothing
                // "user": req.params._id
                // "body": "skalborg!"    //this works!

            });//this is  not functional yet...

            // seems to return all comments... or none

            if (foundComments) {
                console.log("found user?");
                console.log(foundComments); // this is returning an empty bracket... so returns anything
            }
            if (!foundComments) {
                return res.status(400).json({ message: 'Cannot find comments for this user!' });
            }

            return res.json(foundComments);
            
    },

    //get comments by postId    (see posts comments)

    async getCommentsByPost(req, res) { 
        console.log("looking for: " + req.params._id)
        const myComments = await Comment.find({ 
            // "post": req.params._id 
            // "post" : "5f147c9d53960423ccf2a70c"
            //this works empty but refused to give anythign but all or nothing
            //this function wont even accept hardcoded query
        });
        if (!myComments) {
          return res.status(400).json({ message: 'Something is wrong!' });
        }
        console.log("Found:" + myComments);
        console.log(myComments);
        return res.json(myComments);
      },


    // postComment
    async postComment(req, res) {
        const comment = await Comment.create(req.body);

        if (!comment) {
            return res.status(400).json({ message: 'Something is wrong!' });
        }

        return res.json(comment);

    }


    //editComment

};