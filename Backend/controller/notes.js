const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const Note=require('../model/noteModel');

require('dotenv').config();

const Jwtkey=process.env.JWT_SECRET;

const createNotes=async(req,res) =>{
    //res.json({message:"This in create route"});
    //console.log(req.user.id);
    try{
        const {title,content,tags}=req.body;
        const userId = req.user.id;
        

        if(!title || !content ){
            return res.status(400).json({message:'Invalid Intput'});
        }
        const newnote=new Note({
            title,
            content,
            tags,
            user: userId
        });
        await newnote.save();
        res.status(201).json({message:`Note created successfully}`})


    }catch(err){
        console.log(err);
        res.status(500).json({message:'Server error'});

    }
    

}
const GetNotes=async(req,res)=>{
    try{
        //const {userid}=req.user.id;
        const userid=req.user.id;
       //+
       //  console.log(userid);
        if (!userid) {
        return res.status(400).json({ message: "User Id required" });
    }
    const allnotes=await Note.find({user:userid}).sort({createdAt:-1});
    res.status(200).json(allnotes);
        


    }catch(err){
        console.log(err);
        res.status(500).json({message:"Server error"});

    }
}

const deleteNote =async(req,res)=>{
     //const noteid=req.params.id;
     //console.log(noteid);
    try{
        const noteid=req.params.id;
        const deletenote=await Note.findByIdAndDelete(noteid);
        if(!deletenote){
            return res.status(404).json({message:"Note unavailable"});

        }
        res.status(200).json({message:"Note deleted Successfully"});

    }catch(err){
        res.status(500).json({message:"Server error"});
    }
}
const updateNote=async(req,res)=>{
    try{
        const {id}=req.params;
        const {title,content,tags}=req.body;
        if(!title || !content || !tags){
            return res.status(400).json({message: 'Invalid details'});
        }
        const updatedNote=await Note.findByIdAndUpdate(
            id,
            {title,content,tags},
            {new:true}

        );
        res.status(200).json({
            message:"Note updated successfully",
            updatedNote,
        })


    }catch(err){
        console.log("Note updated");
        res.status(500).json({message:"Server error"});
    }
    
}
module.exports={createNotes,GetNotes,deleteNote,updateNote};