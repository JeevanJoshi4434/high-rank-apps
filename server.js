#!/usr/bin/env node
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public'))); // Adjusted the static directory to 'public'

// Route to serve home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Updated to point to the 'public' folder
});

// Route for about page
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html')); // Updated to point to the 'public' folder
});

// Route for services page
app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'services.html')); // Updated to point to the 'public' folder
});

// Route for expertise page
app.get('/expertise', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'expertise.html')); // Updated to point to the 'public' folder
});

// Route for portfolio page
app.get('/portfolio', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'portfolio.html')); // Updated to point to the 'public' folder
});

// Route for contact page
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html')); // Updated to point to the 'public' folder
});

// Endpoint to handle contact form submissions
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    console.log(`Contact Form Submission:`);
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);

    // You can integrate email-sending functionality here using a library like nodemailer
    res.json({ success: true, message: 'Message received. Thank you!' });
});

// Catch-all route for handling undefined routes and redirecting to the home page
// This should be placed after all the other routes to avoid conflicts with static files
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Updated to point to the 'public' folder
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
