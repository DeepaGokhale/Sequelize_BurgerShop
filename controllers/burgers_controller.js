var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("burgers", hbsObject);
  });
});

// //usual routing etc
// router.get("/", function(req, res){
//     connection.query("Select * from burgers", function(err, data) {
//         if (err) console.log(err);
//         //else show the data
//         res.render("burgers", {burgers: data});
//         });
//     });


//usual routing etc
router.post("/api/burgers", function(req, res){
    burger.create("burger", req.body.name, function (result){
    // console.log(req.body.name);
    res.redirect("/");
  });
})

module.exports = router;