const http = require('http')
const app = require('./src/app')
require("dotenv").config();

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./doc/swagger_output.json')
// Swagguer configuration
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

const server = http.createServer(app);
// server listening 
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


