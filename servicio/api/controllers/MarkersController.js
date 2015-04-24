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
		Marker.find().exec(function(err,markers){
			response.features = markers;
			res.send(response);
		});
	}
};
