const express = require("express");
const router = express.Router(); //{ mergeParams: true }


// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to our dog groomer  home route"});
});