/**
 * SumateController
 *
 * @description :: Server-side logic for managing sumates
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('tlcNgHSoRCWYU4QhczWKMA');

module.exports = {
	index: function (req,res){
		mandrill_client.messages.send({
			"message": {
				"text": JSON.stringify(req.allParams()),
				"to": [{
            "email": "nacho.althabe@gmail.com",
            "name": "Nacho Althabe",
            "type": "to"
        }],
			}
		}, function(result) {
    	console.log(result);
			res.json(true);
	  }, function(e) {
    	console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
			res.json(false);
		});
	}
};
