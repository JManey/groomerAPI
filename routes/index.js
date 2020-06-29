const express = require("express");
const router = express.Router(); 


// define a simple route
router.get('/', (req, res) => {
    res.json({"message": "Welcome to our dog groomer  home route"});
});

module.exports = router;