#!/usr/bin/env node
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 10000;
const env = require('dotenv').config();

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
global.location = {
    protocol: 'http:',
    host: 'localhost',
};

// EmailJS configuration
const serviceId = process.env.serviceId; // Your EmailJS service ID
const templateId = process.env.templateId; // Your EmailJS template ID
const publicKey = process.env.publicKey; // Your EmailJS Public Key
const supportEmail = 'support@highrankapps.com'; // Your inbox email

app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // Prepare template parameters
    const templateParams = {
        from_name: name,         // User's name
        from_mail: email,        // User's email
        message: message,        // User's message
        reply_to: supportEmail // Your inbox email for replies
    };

    try {
        // Prepare the request payload for the API call
        const data = {
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey, // Public key as user_id
            template_params: templateParams
        };

        // Send email using EmailJS API with Axios
        const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send', data, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log('Email sent successfully:', response.data);

        // Send a success response to the user
        res.json({ success: true, message: 'Your message has been sent successfully!' });
    } catch (error) {
        console.error('Failed to send email:', error);
        res.status(500).json({ error: 'Failed to send the email. Please try again later.' });
    }
});


// Catch-all route for handling undefined routes and redirecting to the home page
// This should be placed after all the other routes to avoid conflicts with static files
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Updated to point to the 'public' folder
});

app.get('/send', (req, res) => {
    res.status(200).json({ success: true });
});

function functionToActiveServer() {
    try {
        const response = axios.get(`${location.protocol}//${location.host}/send`);
        if(response.status === 200) {
            console.log('Server is active');
            return true;
        }
    } catch (error) {
        return false;
    }
}

setInterval(functionToActiveServer, 20000);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
