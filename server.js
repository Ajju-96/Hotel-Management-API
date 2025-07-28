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
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Welcome to Taj Hotel API</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(to right, #f4f4f4, #e0e0e0);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          .container {
            background-color: #fff;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 8px 16px rgba(0,0,0,0.2);
            text-align: center;
            max-width: 500px;
          }
          h1 {
            color: #1e90ff;
            margin-bottom: 10px;
          }
          p {
            color: #333;
            font-size: 18px;
          }
          a {
            display: inline-block;
            margin: 10px;
            padding: 10px 20px;
            background-color: #1e90ff;
            color: #fff;
            text-decoration: none;
            border-radius: 8px;
            transition: background-color 0.3s ease;
          }
          a:hover {
            background-color: #005ecb;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Welcome to Taj Hotel API</h1>
          <p>Start exploring the API:</p>
          <a href="/Aperson">View Persons</a>
          <a href="/menu">View Menu</a>
        </div>
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





