/**
 * MarkersController
 *
 * @description :: Server-side logic for managing markers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(req,res){
		var response = {
			type: "FeatureCollection"
		};
		Marker.find({
			visible: true
		}).exec(function(err,markers){
			response.features = markers;
			res.send(response);
		});
	},
	remove: function(req,res){
		Marker.update({
			id: req.param('id')
		},{visible: false}).exec(function (err){
  		if(err)
				return res.serverError(err);
			res.send();
  	});
	},
	allVisible: function(req,res){
		Marker.update({},{visible: true}).exec(function (err){
  		if(err)
				return res.serverError(err);
			res.send();
  	});
	}
};
