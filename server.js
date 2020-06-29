const express = require('express');
const indexRoute = require("./routes/index")
const dogsRoute = require("./routes/dogs")


require('dotenv').config()
// connect to the MongoDB with mongoose
require("./config/database");

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(express.json())

app.use('/', indexRoute);
app.use('/dogs', dogsRoute);

// listen for requests
app.listen(process.env.PORT, () => {
    console.log("Server is listening on port 3000");
});
