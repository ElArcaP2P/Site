/**
 * MarcasController
 *
 * @description :: Server-side logic for managing marcas
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index: function(req, res) {
    Feed.find().exec(function(err, feeds) {
      res.geojson(feeds);
    });
  },
  todas: function(req,res){
    Feed.find().exec(function(err, feeds) {
      res.send(feeds);
    });
  }
};
