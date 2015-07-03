// FacebookSrv.js - in api/services

var url = require('url'),
  Twitter = require('twitter'),
  Promise = require('promise'),
  accessToken;


var client = new Twitter({
  consumer_key: 'vvmTe7KcHeeUm1uk5fgWQu8sd',
  consumer_secret: 'JL36iSvFtGyCbz3cyOQ4T9gDDIMcJtq0hfZl99OOCRbFHcAsZj',
  access_token_key: '3253062322-idKbIwqwRicYJG2RJ3dW3kludG3hpYAMyYQWplF',
  access_token_secret: 'A9762aRnF5jyhzgnGxwWJccJU4fW06zGwrvWHgtrlD5uE'
});

module.exports = {

  getFeeds: function(user_name) {
    return new Promise(function(resolve, reject) {
      var params = {
        screen_name: user_name
      };
      client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (error)
          reject(error);
        resolve(tweets);
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
          origin: 'tw',
          type: 'tweet',
          created_at: _feed.created_at,
          user: user_name
        };
        if (_feed.geo) {
          feed.location = _feed.geo.coordinates.reverse();
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
