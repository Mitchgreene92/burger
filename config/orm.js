/*Require connection*/
var connection = require("../config/connection.js");

function pushQM(numMarks){
	var qmArr = [];
    for (var i=0; i<numMarks; i++)
    {
		qmArr.push("?");
	}
	return qmArr.toString();
}

function convSQL(arg){
	var array = [];
	for(var key in arg){
		var value = arg[key];
		if(Object.hasOwnProperty.call(arg, key)){
            if(typeof value === "string" && value.indexOf("") >= 0)
            {
				value=" ' "+value+" ' ";
			}
			array.push(key+"="+value);
		}
	}
	return array.toString();
}

var orm = 
{
    selectAll: function(tableData, callback)
    {
		var queryString = "SELECT * FROM " + tableData + ";";
        connection.query(queryString, function(err,results)
        {
			if(err){
				throw err;
			}
			callback(results);
		});
	},

insertOne: function(table,columns,values,callback)
{
	var query = "INSERT INTO " + table;
	query += "(";
	query += columns.toString();
	query += ")";
	query += "VALUES (";
	query += pushQM(values.length);
	query += ")";

	connection.query(query,values, function(err, results){
		if(err){throw err;}
		callback(results);
	});
},

updateOne: function(table, values, condition, callback)
 {
	var query = "UPDATE " + table;
	query += "SET";
	query += convSQL(values);
	query += " WHERE ";
	query += condition;

	console.log(query);
    connection.query(query, function(err, results)
    {
		if(err){throw err;}
		callback(result);
	});
 },
};

module.exports = orm;
