const mongoose=require('mongoose');

const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    tags:{
        type:[String],
        default:[]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

},{
    timestamps:true,
});

const Note=mongoose.model('Note',noteSchema);
module.exports=Note;