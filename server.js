const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Dummy data store (for testing purposes, use a database in production)
let users = {};

// Signup route: Create a new user
app.post('/signup', (req, res) => {
    const { username, password } = req.body;  // Get data from the request body

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    // Check if user already exists
    if (users[username]) {
        return res.status(400).json({ error: 'Username already exists' });
    }

    // Store the new user (in a real app, save to a database)
    users[username] = password;

    res.status(201).json({ message: 'Signup successful' });
});

// Login route: Authenticate the user
app.post('/login', (req, res) => {
    const { username, password } = req.body;  // Get data from the request body

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    // Check if user exists and password matches
    if (users[username] === password) {
        return res.status(200).json({ message: 'Login successful' });
    } else {
        return res.status(401).json({ error: 'Invalid username or password' });
    }
});

// Test route to check if the server is running
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
