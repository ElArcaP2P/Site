// FacebookSrv.js - in api/services

var url = require('url'),
  ig = require('instagram-node').instagram(),
  Promise = require('promise'),
  accessToken;


ig.use({
  client_id: '32b559704ecf40699fa9da84dd171b64',
  client_secret: 'af2577d10538402f832acf55f9fe08ac'
});

module.exports = {

  getFeeds: function(user_name) {
    return new Promise(function(resolve, reject) {
      var params = {
        screen_name: user_name
      };
      ig.user_media_recent(user_name, function(err, medias, pagination, remaining, limit) {
        if (err)
          reject(err);
        resolve(medias);
      });
    });
  },
  createFeed: function(_feed, user_name) {
    return new Promise(function(resolve, reject) {
      Feed.findOne({
        origin_id: _feed.id
      }).exec(function createCB(err, feed) {
        if (feed) return resolve(false);

        var feed = {
          origin_id: _feed.id,
          origin: 'ig',
          media_type: _feed.type,
          link: _feed.link,
          created_at: _feed.created_time,
          user: user_name,
          type: _feed.type
        };
        if (_feed.location) {
          feed.location = [_feed.location.longitude, _feed.location.latitude];
          feed.state = 'visible';
        } else {
          feed.location = false;
          feed.state = 'hidden';
        }
        Feed.create(feed).exec(function createCB(err, created) {
          if (err)
            return reject(err);
          return resolve(created);
        });
      });
    });
  }
};
