const express = require('express');
const router = express.Router();
const List = require('../Models/MovieList');
const checkifAuth = require('../middlewares/checkAuth');



//Create

router.post('/', checkifAuth ,async (req,res)=>{
    if(req.user.isAdmin){
        const list = new List(req.body);
        try{
            const newlist = await list.save();
            res.status(201).json(newlist)
        }catch(e){
            res.status(201).json(e)
        }
    }else{
        res.status(403).json("You are Not Authenticated")
    }
});

//delete

router.delete('/:id', checkifAuth ,async (req,res)=>{
    if(req.user.isAdmin){
        try{
            await List.findByIdAndDelete(req.params.id);
            res.status(201).json("You have successfully deleted")
        }catch(e){
            res.status(201).json(e)
        }
    }else{
        res.status(403).json("You are Not Authenticated")
    }
});


//Get

router.get('/',checkifAuth,async (req,res)=>{
    const typeQuery = req.query.type;
    const categoryQuery = req.query.category;
    let list = [];

    try{
        if(typeQuery){
            if(categoryQuery){
                list = await List.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: typeQuery, category: categoryQuery } },
                ]);
            }else{
                list = await List.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: typeQuery } },
                ])
            }
        }else{
            list = await List.aggregate([{ $sample: { size: 10 } }]);
        }
        res.status(200).json(list);
    }catch(e){
        res.status(500).json(e);
    }

})


module.exports = router;