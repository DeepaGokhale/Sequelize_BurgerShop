var express = require("express");

var PORT = process.env.PORT || 3000;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
var handleBars = require("express-handlebars");

app.engine("handlebars", handleBars({ defaultLayout: "index" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/burgers_controller.js");

app.use(routes);

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});


/*

var mysql = require("mysql");

// -- boiler plate sql connection

var connection = mysql.createConnection({
                host: "localhost",
                port: 3306,
                user: "root",
                password: "root1234",
                database: "BurgerShop_db"
                });

connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    
    console.log("connected as id " + connection.threadId);
    });

//usual routing etc
app.get("/", function(req, res){
    connection.query("Select * from burgers", function(err, data) {
        if (err) console.log(err);
        //else show the data
        res.render("burgers", {burgers: data});
        });
    });


//usual routing etc
app.get("/burgers", function(req, res){
        //build the page format
        var mainMsg = 'The Burger Shop!';
        var strPage = buildPageInStyle(mainMsg);
        res.send(strPage);
})


*/
  

//   function buildPageInStyle(mainMsg)
//   {
//     var page = '<body style="background-color: blueviolet">';
//     page += '<div class="container">';
//     page += '<h1 style = "color: #e9d298; margin-left: 33%;">' + mainMsg;
//     page += '</h1><p><img src="/assets/images/images.jpg"></p>'
//     page += '<p><span><h2 style="color: #e9d298; margin-left: 33%;">Enter Your Order:</h2>';
//     page += '<input type="text" class="form-control" id="burgerName" name="burgerName" style="margin-left:33%;"></span></p>';

//     //close the tags container and body
//     page += '</div></body>'; 
//     return page;
//   }