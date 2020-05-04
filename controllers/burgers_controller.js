/*Dependencies*/
var express = require("express");
var router = express.Router();
var burgers = require("../models/burger.js");

/*Default to burgers route*/
router.get("/", function(req,res)
{
	res.redirect("burgers")
});

/*Get all burgers*/
router.get("/burgers", function(req,res)
{
    burgers.selectAll(function(data)
    {
        var brgObj = 
        {
			burgers: data
		};
		res.render("index", brgObj);
	});
});

/*Post route for creating burgers*/
router.post("/burgers/create", function(req,res)
{
	burgers.insertOne(
        [
		"burger_name"
        ],
            [
			req.body.burger_name
            ], function(data)
            {
				res.redirect("/burgers");
			});
});

/*updating a burger by id*/
router.put("/burgers/update/:id", function(req,res)
{
	var idCond = "id = " + req.params.id;
	console.log("condition", idCond);
	burgers.updateOne(
        {
		"devoured": req.body.devoured
        }
        , idCond, function(data)
        {
		res.redirect("/burgers")
	    });
});

module.exports = router;