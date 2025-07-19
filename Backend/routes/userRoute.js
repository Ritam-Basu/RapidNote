const express=require('express');

const router= express.Router();
//const userController = require('../controller/user');
const {signupuser,loginUser}=require('../controller/user');
const {createNotes,GetNotes,deleteNote,updateNote}=require('../controller/notes');
const authmiddleware=require('../middleware/authmiddleware');


router.post('/signup',signupuser);


router.post('/login',loginUser);

router.post('/create',authmiddleware,createNotes);
router.get('/getnotes',authmiddleware,GetNotes);
router.delete('/removenotes/:id',authmiddleware,deleteNote);
router.put('/updatenote/:id',authmiddleware,updateNote);



module.exports=router;


