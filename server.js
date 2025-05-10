const express = require('express');
const app = express();
const routes = require('./routes');
const contactsRoutes = require('./routes/contacts');
require('dotenv').config();
const cors = require('cors');

const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Middleware to enable CORS (different domain access)
app.use(cors());

// Home page route
app.get('/', (req, res) => {
    res.send('Welcome!');
});


// Routes index.js
app.use('/contacts', contactsRoutes);

// Route to handle dabase connection errors
async function initializeServer() {
    try {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1); // Ends the process with failure code 1 (general error)
    }
}

initializeServer();