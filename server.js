// Setup empty JS object to act as endpoint for all routes
projectData = {};

// including packages
 const cors = require('cors');
 const express = require('express');
 const bodyParer = require('body-parser');

 // setting the port

 const port = 8000;

// Start up an instance of app

const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
 app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// server listener

app.listen(port, ()=> {console.log(`server running on port: ${port}`);});

//function to return all data in project endpoint

app.get('/all', (req,res)=>{res.send(projectData).status(200).end()});

//the POST request

app.post('/postData', (req,res)=>{
  projectData = {
    temp: request.body.temp,
    date: request.body.date,
    content: request.body.content
  };
  res.send(projectData).status(200).end();
});
