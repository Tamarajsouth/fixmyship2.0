const { Tag } = require('../models');

module.exports = {
    async getAllTags(req, res) {
        console.log("Called for tags");
        const tags = await Tag.find();  //function is not working quite yet...
        if (!tags){
            err = "Error: no tags found";
            return res.json(err);
        }
        return res.json(tags);
      },
};