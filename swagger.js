const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API Store demo',
    description: 'Building a demo store portfolio',
    contact: {
      name: 'Enderson Omana',
      email: 'omana.endersonj@gmail.com',
    },
  },
  host: 'localhost:3000',
  schemes: ['http'],/* 
  basePath: '', */
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer'
      }
    }
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = './routes/index.js';

swaggerAutogen(outputFile, [endpointsFiles], doc).then(async () => {
  await require(endpointsFiles); // Your project's root file
});
