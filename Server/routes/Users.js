const express = require('express');
const router = express.Router();
const User = require('../Models/Users');
const CryptoJs = require('crypto-js');
const checkifAuth = require('../middlewares/checkAuth')


//Get Yearly User status

router.get("/stats", async (req, res) => {
    const today = new Date();
    const latYear = today.setFullYear(today.setFullYear() - 1);
  
    try {
      const data = await User.aggregate([
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err);
    }
  });


//Update

router.put('/:id', checkifAuth ,async (req,res)=>{
    if(req.user.id === req.params.id || req.user.isAdmin){
        if(req.body.password){
            req.body.password = CryptoJs.AES.encrypt(req.body.password,process.env.SECRET).toString();
        }

        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set: req.body,
            },
            {new: true});
            res.status(200).json(updatedUser)
        }catch(e){
            res.status(500).json(e)
        }
    }else{
        res.status(403).json("You can only update in your account")
    }
});

//Delete 

router.delete('/:id', checkifAuth ,async (req,res)=>{
    if(req.user.id === req.params.id || req.user.isAdmin){
        try{
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been Deleted.")
        }catch(e){
            res.status(500).json(e)
        }
    }else{
        res.status(403).json("You can only delete in your account")
    }
});

//Get perticular user

router.get('/:id' ,async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const { password, ...data } = user._doc;
        res.status(200).json(data);
    }catch(e){
        res.status(500).json(e);
    }
});

//Get All Users

router.get('/',checkifAuth,async(req,res)=>{
    const query = req.query.sort;
    if(req.user.isAdmin){
        try{
            const users = query ? await User.find().sort({_id:-1}).limit(5) : await User.find();
            res.status(200).json(users);
        }catch(e){
            res.status(500).json(e);
        }
    }else{
        res.status(403).json("You are not allowed to view all users");
    }
})


  


module.exports = router;
