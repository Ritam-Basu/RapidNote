const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const jwt =require('jsonwebtoken');
const User=require('../model/userModel');
require('dotenv').config();

const Jwtkey=process.env.JWT_SECRET;

const signupuser=async(req,res)=>{
    try{
     //   console.log(Jwtkey);
        const {name,email,password}=req.body;
        const exisitinguser=await User.findOne({email});
        if(exisitinguser){
            res.status(400).json({message:'User already exists'});
        }
        const hashpassword=await bcrypt.hash(password,10);

        const newuser=new User({name,email,password:hashpassword});
        const token=jwt.sign({userId:newuser._id},Jwtkey,{expiresIn:'2h'});
       // console.log(token);
        await newuser.save();
        res.status(201).json({
            
        
            message:`User registerd successfully ${hashpassword}`,
            token:token,
        
        });
            
    }catch(err){
        console.log(err);
        res.status(500).json({message:'Server error'});
    }


}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

    
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials'

                
                });
        }
        const token=jwt.sign({
            userId:user._id,},
            Jwtkey,
            {expiresIn:"2h"},

        )

        res.status(200).json({ message: 'Login successful',
            token,
         });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports={signupuser,loginUser}



