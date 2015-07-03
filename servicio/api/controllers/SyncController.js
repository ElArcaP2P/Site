/**
 * SyncController
 *
 * @description :: Server-side logic for managing Syncs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var Promise = require('promise');

module.exports = {
  twitter: function(req, res) {
    var feeds = [],
      user_name = req.query.user_name || 'elarcap2p';
    TwitterSrv.getFeeds(user_name).then(function(_feeds) {
      var promises = [];
      _feeds.forEach(function(_feed) {
        promises.push(TwitterSrv.createFeed(_feed, user_name));
      });
      Promise.all(promises).then(function(result) {
        return res.send({
          news: result.filter(function(elem) {
            return (elem == false) ? false : true;
          }).length
        });
      }, function(err) {
        return res.send(error);
      });
    }, function(err) {
      res.serverError(err);
    });
  },
  instagram: function(req, res) {
    var feeds = [],
      user_name = req.query.user_name || '1972090779';
    InstagramSrv.getFeeds(user_name).then(function(_feeds) {
      var promises = [];
      _feeds.forEach(function(_feed) {
        promises.push(InstagramSrv.createFeed(_feed, user_name));
      });
      Promise.all(promises).then(function(result) {
        return res.send({
          news: result.filter(function(elem) {
            return (elem == false) ? false : true;
          }).length
        });
      }, function(err) {
        return res.send(error);
      });
    }, function(err) {
      return res.serverError(err);
    });
  },
  facebook: function(req, res) {
    var feeds = [],
      user_name = req.query.user_name || 'elarcap2p';
    FacebookSrv.getFeeds(1, user_name).then(function(_feeds) {
        var promises = [];
        _feeds.forEach(function(_feed) {
          promises.push(FacebookSrv.createFeed(_feed, user_name));
        });
        Promise.all(promises).then(function(result) {
          return res.send({
            news: result.filter(function(elem) {
              return (elem == false) ? false : true;
            }).length
          });
        }, function(err) {
          return res.send(error);
        });
      },
      function(err) {
        res.serverError(err);
      });
  }
};
