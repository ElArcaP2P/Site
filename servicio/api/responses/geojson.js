/**
 * 200 (OK) Response
 *
 * Usage:
 * return res.ok();
 * return res.ok(data);
 * return res.ok(data, 'auth/login');
 *
 * @param  {Object} data
 * @param  {String|Object} options
 *          - pass string to render specified view
 */

module.exports = function sendOK (data, options) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  sails.log.silly('res.geojson() :: Sending features!');

  var features = [];

  data.forEach(function(feed){
    if(!feed.location) return;
    var feature = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: feed.location
      },
      properties: feed
    };
    features.push(feature);
  });

  // Set status code
  res.status(200);
  var response = {
    type: "FeatureCollection",
    features: features
  }
  res.send(response);

};
