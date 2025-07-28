const express = require("express");
const app = express();
const db = require("./db"); // Import the database connection
require("dotenv").config(); // Load environment variables from .env file

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // Middleware to parse JSON bodies
const PORT = process.env.PORT || 3000;


// app.get("/", (req, res) => {
//     res.send("Welcome to the Taj Hotel API  For getting started, visit /Aperson or /menu");
// });
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Taj Hotel API</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 40px;
            text-align: center;
          }
          h1 {
            color: #2e8b57;
          }
          p {
            font-size: 18px;
          }
          a {
            color: #1e90ff;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <h1>Welcome to the Taj Hotel API</h1>
        <p>For getting started, visit:</p>
        <p><a href="/Aperson">/Aperson</a></p>
        <p><a href="/menu">/menu</a></p>
      </body>
    </html>
  `);
});



const personRouter = require("./routes/personRouter"); // Import the personRouter model
const menuItem = require("./routes/menuItem"); // Import the MenuItem model 

app.use("/Aperson", personRouter);
app.use("/menu", menuItem);

/*{    const data = req.body;

//create a new Aperson instance
newPerson = new Aperson(data);

// save the new person to the database
newPerson.save(error, savePerson =>{
    if(error){
        console.log('error saving person:', error);
        res.json(500).send('error saving person');
        }else{
            console.log('data saved successfully:', person);
        res.status(201).json(savePerson); // Respond with the created person
        }
        
        })
        }*/



app.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
}); // Start the server on port 3000





