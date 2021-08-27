const app = require('express')()
const bodyParser = require('body-parser');
var cors = require('cors')

require("../config/database").connect();

// json configuration
app.use(bodyParser.json());

// cors
app.use(cors())

//rotas
app.use("/api", require("./routes"));

module.exports = app;

