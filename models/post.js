const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const postSchema = new Schema({
    title: {type:String, required:true},
    body: {type: String},
    image : {type: String},
    
});

const postModel = mongoose.model("Post",postSchema) 
module.exports = postModel;