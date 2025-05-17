const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'My API',
        description: 'Contacts API',
    },
    host: 'localhost:8080',
    schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/Contacts.js', './routes/index.js'];

// Generate swagger.json
// swaggerAutogen will create a swagger.json file based on the provided endpoints
swaggerAutogen(outputFile, endpointsFiles, doc);