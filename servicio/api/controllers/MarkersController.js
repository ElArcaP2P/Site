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
	},
	remove: function(req,res){
		Marker.destroy(req.param('id')).exec(function deleteCB(err){
  		console.log('The record has been deleted');
  	});
	}
};
