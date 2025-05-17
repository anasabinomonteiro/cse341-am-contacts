const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const { connectToDb } = require('./db/connect');

const contactsRoutes = require('./routes/contacts');
const indexRoute = require('./routes/index');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

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
app.use('/', indexRoute);
app.use('/contacts', contactsRoutes);

//swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

async function startServer() {
    try {
        await connectToDb();
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
            console.log(`Swagger UI is available at http://localhost:${port}/api-docs`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
}
// Start the server
startServer();
