const jwt=require('jsonwebtoken');
require('dotenv').config();

const Jwtkey=process.env.JWT_SECRET;

const authmiddleware =(req,res,next)=>{
    // const authheader=req.headers.authorization;
    // if()
    const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token=authHeader.split(" ")[1];
  try{
    const decode=jwt.verify(token,Jwtkey);
    if (!decode.userId) {
      return res.status(400).json({ message: "Invalid token payload." });
    }
    req.user={id:decode.userId};
    console.log(req.user);
    next();

  }catch(err){
    res.status(500).json({message:"Server error in middleware"});
  }

}
module.exports=authmiddleware;