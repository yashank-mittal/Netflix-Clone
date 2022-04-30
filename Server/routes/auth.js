const express = require('express');
const router = express.Router();
const User = require('../Models/Users');
const CryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');

//Register
router.post('/register',async(req,res)=>{
    const user = new User({
        username : req.body.username,
        email: req.body.email,
        //encrypt password
        password: CryptoJs.AES.encrypt(req.body.password,process.env.SECRET).toString(),
    });

    try{
        const newuser = await user.save();
        res.status(201).json(newuser);
    }catch(e){
        res.status(500).json(e);
    }

})

//Login
router.post('/login', async (req,res)=>{
    try{
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(401).json("Not Find User");

        //Decrypt
        const bytes = CryptoJs.AES.decrypt(user.password, process.env.SECRET);
        const originalPassword = bytes.toString(CryptoJs.enc.Utf8);

        originalPassword !== req.body.password && res.status(401).json("Not Matched with User's Password");

        const { password, ...data } = user._doc;

        const actualToken = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.SECRET,
            { expiresIn: '1d' }
        )

        res.status(200).json({...data, actualToken});

    }catch(e){
        res.status(500).json(e);
    }
})

module.exports = router