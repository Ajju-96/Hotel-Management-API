const express = require('express');
const MenuItem = require('../model/MenuItem'); // Import the MenuItem model
const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find(); // Fetch all menu items
    console.log("Menu items fetched successfully");
    res.status(200).json(data);
  } catch (err) {
    console.error("Error saving menu:", err);
    res.status(500).json({ error: "Error saving menu" });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new MenuItem(data); // Create a new menu item instance
    const response = await newMenu.save(); // Save the new person to the database
    console.log("menu saved successfully");
    res.status(200).json(response);
  } catch (err) {
    console.error("Error saving menucard:", err);
    res.status(500).json({ error: "Error saving menucard" });
  }
});


router.put('/:id', async (req, res)=>{
    try{
        const menuId = req.params.id;
        const updateMenu = req.body;
        
        const updatedMenuDate = await MenuItem.findByIdAndUpdate(menuId, updateMenu,{
            new: true,
            runValidators: true
        })


        if(!updatedMenuDate){
            return res.status(404).json({ error: 'Menu item not found' });
        }
        else if(updatedMenuDate){
            console.log('Menu item updated successfully');
            res.status(200).json(updatedMenuDate);
        }
        else{
            console.log('No changes made to menu item data');
            return res.status(400).json({ error: 'No changes made to menu item data' });
        }
        
        console.log('Menu item updated successfully');
        res.status(200).json(updatedMenuDate);
        

    }catch(err){
        console.log('Error updating meny item data:', err);
        res.status(500).json({error: "Error updating menu item data"});
        
    }
})

module.exports = router; // Export the router for use in server.js


