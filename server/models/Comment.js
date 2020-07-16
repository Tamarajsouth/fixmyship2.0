const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const postSchema = require('./Post');
const userSchema = require('./User');

const commentSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User"
            // does this need to match the keyname of the userschema id?
        },
        mainText: String,
        numLikes: Number,
        createdAt: {type: Date, default: Date.now}
        // pull in email form user instead of here?
        // favorites? 
        // title?



        //   posts: [
        //     {
        //       type: Schema.Types.ObjectId,
        //       ref: "Post",
        //     }
        //   ]
        // },  
        // set this to use virtual below
        // {
        //   toJSON: {
        //     virtuals: true,
        //   },
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

