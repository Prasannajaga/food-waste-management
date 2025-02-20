// src/routes/userRoutes.ts
import { Router } from 'express';
import  User  from '../models/Users';

const router = Router();

// Create
router.post('/create', async (req, res) => {
  // Try to create a new user with the data sent in the request body
  try {
    const user = await User.create(req.body);
    // If successful, return the newly created user
    res.json(user);
  } catch (error) {
    // If there's an error, return a 500 status code and a JSON object with an error message
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Read
router.get('', async (req, res) => {
  // Try to fetch all users from the database
  try {
    const users = await User.findAll();
    // If successful, return all the users
    res.json(users);
  } catch (error) {
    // If there's an error, return a 500 status code and a JSON object with an error message
    res.status(500).json({ message: 'Error fetching users' });
  }
});

router.get('/:id', async (req, res) => {
  // Try to fetch all users from the database
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);    // If successful, return all the users
    if(user){
      res.json(user);
    }
    else{
      res.json({message : "user not found"})
    }
  } catch (error) {
    // If there's an error, return a 500 status code and a JSON object with an error message
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Update
router.put('/update/:id', async (req, res) => {
  // Try to find the user with the id sent in the request params
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    // If the user is not found, return a 404 status code and a JSON object with an error message
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      // If the user is found, try to update it with the data sent in the request body
      const user2 = await user.update(req.body); 
      
      // If successful, return the updated user
      res.json(user);
    }
  } catch (error) {
    // If there's an error, return a 500 status code and a JSON object with an error message
    res.status(500).json({ message: 'Error updating user' });
  }
});

// Delete
router.delete('/delete/:id', async (req, res) => {
  // Try to find the user with the id sent in the request params
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    // If the user is not found, return a 404 status code and a JSON object with an error message
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      // If the user is found, try to delete it
      await user.destroy();
      // If successful, return a JSON object with a success message
      res.json({ message: 'User deleted successfully' });
    }
  } catch (error) {
    // If there's an error, return a 500 status code and a JSON object with an error message
    res.status(500).json({ message: 'Error deleting user' });
  }
});

export default router;
