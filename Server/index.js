const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/Users');
const listRoutes = require('./routes/movieList');
const movieRoutes = require("./routes/movie");

mongoose.connect(process.env.MONGOURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("DB is connected")
})
.catch((e)=>{
    console.log("DB is not connected");
    console.log(e)
})

app.use(express.json());

app.use("/auth",authRoutes);
app.use('/user',userRoutes);
app.use('/movies',movieRoutes);
app.use('/list',listRoutes);



app.listen(8080,()=>{
    console.log("Server is Running");
})