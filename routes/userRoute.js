const express = require("express");
const router = express.Router();
const User = require("../models/userModel")
router.post("/register",async (req,res)=>{
    const {name,email,password}=req.body
    const newUser = new User({name,email,password})

    try{
        newUser.save()
        res.send('User Registered successfully, please Login')
    } catch(error){
        return res.status(400).json({message:error})
    }
});

module.exports = router

router.post('/login',async(req,res)=>{
    const {email,password} = req.body
    try{
        const user = await User.findOne({email, password})

        if(user)
        {
            // res.send('userloged in successfully')
            // res.send(user[0])
            const currentUser ={
                // name: user[0].name,
                // email:user[0].email,
                // isAdmin:user[0].isAdmin,
                // _id:user[0]._id
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                _id:user._id
            }
            res.send(currentUser);
        }
        else
        {
        return res.status(400).json({message:"User Login Failed"});
        }
} catch(error){
    return res.status(400).json({message:'Somethong went wrong'});
}
})