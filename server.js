const express = require('express');
const app = express();
const contactsRoutes = require('./routes/contacts');
require('dotenv').config();
const cors = require('cors');
const { connectToDb } = require('./db/connect');
const swaggerRoute = require('./routes/swagger');

const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ message: 'Invalid JSON payload' });
    }
    next();
});

// Middleware to enable CORS (different domain access)
app.use(cors());

// Middleware to serve static files
app.use('/contacts', contactsRoutes);
app.use('/', swaggerRoute);

// Home page route
app.get('/', (req, res) => {
    res.send('Welcome!');
});

async function startServer() {
    try {
        await connectToDb();
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
}
// Start the server
startServer();
