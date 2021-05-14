// Setup empty JS object to act as endpoint for all routes
projectData = {};

//require dependencies 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//starting an instance of express
const app = express();


// Initialize the main project folder
app.use(express.static('website'));


//configuring express to use cors 
app.use(cors());

//declaring a port 
const port = 8000;

//setting up server and making it listen to port
app.listen(port, ()=>{console.log(`server is running and listening to port: ${port}`);});

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/add', (req,res)=>{
    projectData.temp = req.body.temp;
    projectData.date = req.body.date;
});

app.get('/all',(req,res)=>{
  res.send(projectData);
});
