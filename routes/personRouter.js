const express = require('express');
const router = express.Router();
const Aperson = require('../model/Aperson'); // Import the Aperson model


router.get('/', async (req, res) => {
    try{
        const data = await Aperson.find();
        console.log('data fetched successfully');
        res.status(200).json(data)
    }catch(err){
        console.error('Error saving person:', err);
        res.status(500).json({ error: 'Error saving person' }); 
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