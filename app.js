const express = require('express');
const app = express();
const routerApi = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger-output.json');

const {
    logErrors,
    errorHandler,
    boomErrorHandler,
    ormErrorHandler
} = require('./middlewares/error.handler')

app.use(express.json())
app.use('/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs,{ swaggerOptions: { persistAuthorization: true } })
);
routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

module.exports = app