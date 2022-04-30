const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    desc:{
        type: String,
        required: true,
    },
    img:{
        type: String,
        required: true
    },
    titleimg:{
        type: String,
    },
    icon:{
        type: String,
        default: false
    },
    trailer:{
        type: String
    },
    video:{
        type: String
    },
    year:{
        type: String
    },
    Agelimit:{
        type: Number
    },
    category:{
        type: String
    },
    isSeries:{
        type: Boolean,
        default: false
    }
},{timestamps: true})


const Movie = mongoose.model('Movie',MovieSchema);

module.exports = Movie;