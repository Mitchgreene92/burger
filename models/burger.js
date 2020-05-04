var orm = require("../config/orm.js");

var burgers = {
    selectAll: function(callback)
    {
        orm.selectAll("burgers", function(res)
        {
			callback(res);
		});
	},

    insertOne: function(columns,values,callback)
    {
        orm.insertOne("burgers", columns, values, function(res)
        {
			callback(res);
		});
	},

    updateOne: function(values, condition, callback)
    {
        orm.updateOne("burgers", values, condition, function(res)
        {
			callback(res);
		});
	},
};

module.exports = burgers;
