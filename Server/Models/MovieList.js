const mongoose = require('mongoose');

const MovieListSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    type:{
        type: String,
    },
    category:{
        type: String
    },
    List:{
        type: Array,
    }
},{timestamps: true})


const MovieList = mongoose.model('MovieList',MovieListSchema);

module.exports = MovieList;