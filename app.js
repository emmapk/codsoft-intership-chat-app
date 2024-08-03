const express = require("express");
const http = require('http');
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes."); 
const bodyParser = require('body-parser');
const path = require ("path")


const app = express();



const port = 3000; 

app.use(express.json());


app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/chatApplication').then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

app.set('view engine', 'ejs')
app.set("views", path.join(__dirname, "/views"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(userRouter); 

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
