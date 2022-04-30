const express = require('express');
const router = express.Router();
const Movie = require('../Models/Movie');
const checkifAuth = require('../middlewares/checkAuth');



//Create

router.post('/', checkifAuth ,async (req,res)=>{
    if(req.user.isAdmin){
        const movie = new Movie(req.body);
        try{
            const newmovie = await movie.save();
            res.status(201).json(newmovie)
        }catch(e){
            res.status(201).json(e)
        }
    }else{
        res.status(403).json("You are Not Authenticated")
    }
});

//Update

router.put('/:id', checkifAuth ,async (req,res)=>{
    if(req.user.isAdmin){
        try{
            const updatedMovie = await Movie.findByIdAndUpdate(req.params.id,{
                $set: req.body,
            },{
                new:true
            });
            res.status(200).json(updatedMovie)
        }catch(e){
            res.status(201).json(e)
        }
    }else{
        res.status(403).json("You are Not Authenticated")
    }
});
  
//Delete

router.delete('/:id', checkifAuth ,async (req,res)=>{
    if(req.user.isAdmin){
        try{
            await Movie.findByIdAndDelete(req.params.id);
            res.status(200).json("Movie has been Deleted")
        }catch(e){
            res.status(201).json(e)
        }
    }else{
        res.status(403).json("You are Not Authenticated")
    }
});

//Get Perticular Movie

router.get('/search/:id', async (req,res)=>{
        try{
            const movie = await Movie.findById(req.params.id);
            res.status(200).json(movie)
        }catch(e){
            res.status(201).json(e)
        }
});


//Get Random Movie

router.get("/random", checkifAuth, async (req, res) => {
    const type = req.query.type;
    let movie;
    try {
      if (type === "series") {
        movie = await Movie.aggregate([
          { $match: { isSeries: true } },
          { $sample: { size: 1 } },
        ]);
      } else {
        movie = await Movie.aggregate([
          { $match: { isSeries: false } },
          { $sample: { size: 1 } },
        ]);
      }
      res.status(200).json(movie);
    } catch (err) {
      res.status(500).json(err);
    }
  });


// Get All Movies

router.get('/', checkifAuth ,async (req,res)=>{
    if(req.user.isAdmin){
        try{
            const movies = await Movie.find();
            res.status(200).json(movies.reverse())
        }catch(e){
            res.status(201).json(e)
        }
    }else{
        res.status(403).json("You are Not Authenticated")
    }
});

module.exports = router;