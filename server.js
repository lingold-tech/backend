const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());  // For parsing application/json
app.use(cors());  // To handle CORS issues

const users = [];

app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    // Check if the user already exists
    const userExists = users.some(user => user.username === username);
    if (userExists) {
        return res.status(400).json({ message: 'Username already exists.' });
    }
    // Store the new user (in a real app, store it in a database)
    users.push({ username, password });
    res.status(201).json({ message: 'User created successfully.' });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);
    if (!user || user.password !== password) {
        return res.status(400).json({ message: 'Incorrect username or password.' });
    }
    res.status(200).json({ message: 'Login successful.' });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
