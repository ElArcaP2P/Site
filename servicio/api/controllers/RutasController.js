/**
 * RutasController
 *
 * @description :: Server-side logic for managing rutas
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(req,res){
		res.send([{
			title: 'La salida',
			url: '/rutas/1.geojson'
		}])
	}
};
