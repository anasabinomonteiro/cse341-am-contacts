const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'My API',
        description: 'Contacts API',
    },
    host: process.env.SWAGGER_HOST || 'localhost:3000',
    schemes: process.env.SWAGGER_SCHEME ? [process.env.SWAGGER_SCHEME] : ['http'],
    // host: 'cse341-am-contacts.onrender.com',
    // schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/contacts.js'];

// Generate swagger.json
// swaggerAutogen will create a swagger.json file based on the provided endpoints
swaggerAutogen(outputFile, endpointsFiles, doc);