const { Schema, model } = require('mongoose');

const tagSchema = new Schema(
{
    tagName: String,
    articleIds: [
        {
            type: String,
            //this is just a list of articlePost ids that fall under this category.
            //Need to figure out if we are missing some refs or code to make relationship work

        }
        ]
});

const Tag = model('Tag', tagSchema);

module.exports = Tag;