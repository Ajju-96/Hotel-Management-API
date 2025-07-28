const express = require('express');
const router = express.Router();
const Aperson = require('../model/Aperson'); // Import the Aperson model


// router.get('/', async (req, res) => {
//     try{
//         const data = await Aperson.find();
//         console.log('data fetched successfully');
//         res.status(200).json(data)
//     }catch(err){
//         console.error('Error saving person:', err);
//         res.status(500).json({ error: 'Error saving person' }); 
//     }
// });

app.get("/Aperson", async (req, res) => {
  try {
    const people = await Aperson.find(); // Replace YourModel with your actual model name (e.g., Aperson)

    let rows = people.map(person => `
      <tr>
        <td>${person.name}</td>
        <td>${person.age}</td>
        <td>${person.work}</td>
        <td>${person.email}</td>
        <td>${person.mobile}</td>
        <td>${person.address}</td>
        <td>₹${person.salary.toLocaleString()}</td>
      </tr>
    `).join('');

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Aperson Data - Taj Hotel API</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background: #f4f4f4;
              padding: 40px;
              color: #333;
            }
            h1 {
              text-align: center;
              color: #1e90ff;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 30px;
              background-color: #fff;
              box-shadow: 0 4px 10px rgba(0,0,0,0.1);
              border-radius: 10px;
              overflow: hidden;
            }
            th, td {
              padding: 15px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
            th {
              background-color: #1e90ff;
              color: white;
            }
            tr:hover {
              background-color: #f1f1f1;
            }
          </style>
        </head>
        <body>
          <h1>Team Members - Taj Hotel</h1>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Work</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Address</th>
                <th>Salary</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send("Server error");
  }
});



router.post('/', async(req, res) => {
    try{
        const data = req.body;// assuming the request body contains the person data
        
        //Create a new Aperson document using the Mongoose model
        const newPerson = new Aperson(data);

        // Save the new person to the database
        const response = await newPerson.save()
        console.log('data seved');
        res.status(200).json(response)
    }
    catch(err){
        console.error('Error saving person:', err);
        res.status(500).json({ error: 'Error saving person' }); 
    }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (
      workType == "Chef" ||
      workType == "Staff" ||
      workType == "Manager" ||
      workType == "cleaner"
    ) {
      const response = await Aperson.find({ work: workType });
      console.log("Person fetched by work type successfully");
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: "Invalid work type" });
    }
  } catch (err) {
    console.error("Error fetching person by work type:", err);
    res.status(500).json({ error: "Error fetching person by work type" });
  }
});

router.put('/:id', async (req, res) =>{
    try{
        const id = req.params.id; // Get the ID from the request parameters
        const updatedPerson = req.body; // Get the updated person data from the request body

        const updatedPersonDataResponse = await Aperson.findByIdAndUpdate(id, updatedPerson,{
            new: true,
            runValidators: true
        })  

        if(!updatedPersonDataResponse) {
            return res.status(404).json({ error: 'Person not found' });
        }
        else if(updatedPersonDataResponse){
            console.log('Person data updated successfully');
            res.status(200).json(updatedPersonDataResponse);
        }
        else{
            console.log('No changes made to person data');
            return res.status(400).json({ error: 'No changes made to person data' });   
        }
    
        console.log('data updated successfully');
        res.status(200).json(updatedPersonDataResponse);

    }catch(err){
        console.log('Error updating persondata:', err);
        res.status(500).json({error: 'ERROR UPDATING PERSONDATA'});
        
    }
})

router.delete('/', async (req, res) => {
    try{
        const info = await Aperson.deleteOne({ name: 'ajay'});
        console.log('data delete successfully');
        res.status(200).json(info)
    }catch(err){
        console.error('Error deleting person:', err);
        res.status(500).json({ error: 'Error deleting person' }); 
    }
});


module.exports = router;