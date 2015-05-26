/**
 * MarcasController
 *
 * @description :: Server-side logic for managing marcas
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
	}
};
