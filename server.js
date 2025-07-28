require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const app = express();
const db = require("./db"); // Import the database connection
const MenuItem = require("./model/MenuItem");


const bodyParser = require("body-parser");
app.use(bodyParser.json()); // Middleware to parse JSON bodies
const PORT = process.env.PORT || 3000; // Use the PORT from environment variables or default to 3000

app.get("/", (req, res) => {
    res.send("Welcome to the Taj Hotel API");
});



const personRouter = require("./routes/personRouter"); // Import the personRouter model
const menuItem = require("./routes/MenuItem"); // Import the MenuItem model 

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
