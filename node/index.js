const express = require("express");
const app = express();
const cors = require("cors");

 require('./models/dbConfig');
 const postsRoutes =require("./routes/postsControllers");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
 //middelwares
 app.use(bodyParser.json())
 app.use(cors())
 app.use('/posts', postsRoutes)

app.listen(5500, ()=> console.log('server starting: 5500'))