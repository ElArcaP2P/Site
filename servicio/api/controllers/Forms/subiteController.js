/**
 * Forms/subiteController
 *
 * @description :: Server-side logic for managing forms/subites
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index: function(req, res) {
    var params = req.allParams(),
        marker = {};

    marker.geometry = {
      type: 'Point',
      coordinates: params.position
    };

    delete params.position;
    marker.properties = params;

    marker.type = 'Feature';

    Marker.create(marker).exec(function createCB(err, created) {
			res.send(created);
    });
  }
};
