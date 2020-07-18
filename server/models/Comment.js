const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const postSchema = require('./Post');
const userSchema = require('./User');

const commentSchema = new Schema(
    {   //CHANGE USERID TO USERNAME
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
            // does this need to match the keyname of the userschema id?
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: "Post"
        },
        mainText: String,
        numLikes: Number,
        createdAt: {type: Date, default: Date.now}
    }
);

// hash user password
//   userSchema.pre('save', async function (next) {
//     if (this.isNew || this.isModified('password')) {
//       const saltRounds = 10;
//       this.password = await bcrypt.hash(this.password, saltRounds);
//     }

//     next();
//   });




// do I need a hook to grab the references?

const Comment = model('Comment', commentSchema);

module.exports = Comment;

