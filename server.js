// Example of a backend using Express.js
const express = require('express');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Store users in-memory for simplicity (in a real app, this would be a database)
let users = [];

// Handle the POST request for signup
app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ message: 'Username already exists!' });
    }

    // Add the new user (in a real app, store it in a database)
    users.push({ username, password });

    res.status(201).json({ message: 'Signup successful!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
