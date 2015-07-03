// FacebookSrv.js - in api/services

var url = require('url'),
  FB = require('fb'),
  Promise = require('promise'),
  accessToken;

FB.api('oauth/access_token', {
  client_id: '1106261512723731',
  client_secret: 'fd948e513c522de23ba4a30ee9ba8069',
  grant_type: 'client_credentials'
}, function(res) {
  if (!res || res.error) {
    console.log(!res ? 'error occurred' : res.error);
    return;
  }
  console.log('oauth/access_token', res);
  accessToken = res.access_token;
});

module.exports = {

  getFeeds: function(iterations, user_name) {
    var response = [],
      current_iteration = 0;
    return new Promise(function(resolve, reject) {
      //return resolve(JSON.parse('{"data":[{"id":"1581878778726172_1601663323414384","from":{"category":"Community","name":"El Arcap2p","id":"1581878778726172"},"to":{"data":[{"category":"Arts/Entertainment/Nightlife","category_list":[{"id":"203916779633178","name":"Dance Instruction"},{"id":"200742186618963","name":"Vegetarian & Vegan Restaurant"},{"id":"133436743388217","name":"Arts & Entertainment"}],"name":"La Pepa","id":"321613968048341"}]},"with_tags":{"data":[{"id":"10203650096307349","name":"Yan Adrover"},{"id":"10153328311414904","name":"Mariana Castro"},{"id":"740797382","name":"Ignacio Althabe"},{"id":"10206934712106042","name":"Gabriela Bertolotto"},{"id":"10206345222847184","name":"Mica Giayetto"},{"id":"10154957862405183","name":"Junior Adrover"},{"id":"10153900230778484","name":"Pato Bertolotto"}]},"message":"La Pepa y El Arca un solo corazón...","message_tags":{"0":[{"id":"321613968048341","name":"La Pepa","type":"page","offset":0,"length":7}]},"story":"El Arcap2p with Yan Adrover and 6 others at La Pepa","picture":"https://scontent.xx.fbcdn.net/hphotos-xtp1/v/t1.0-9/s130x130/11350784_1601663323414384_8301607176039047389_n.jpg?oh=725f6cba8dc33cb4c3affeddf2a74249&oe=55ED036E","link":"https://www.facebook.com/elarcap2p/photos/a.1594460990801284.1073741830.1581878778726172/1601663323414384/?type=1","icon":"https://www.facebook.com/images/icons/photo.gif","actions":[{"name":"Comment","link":"https://www.facebook.com/1581878778726172/posts/1601663323414384"},{"name":"Like","link":"https://www.facebook.com/1581878778726172/posts/1601663323414384"}],"privacy":{"value":"EVERYONE","description":"Public","friends":"","allow":"","deny":""},"place":{"id":"321613968048341","name":"La Pepa","location":{"city":"Córdoba","country":"Argentina","latitude":-31.391146669119,"longitude":-64.183325185861,"street":"Isabel la católica 664","zip":"5001"}},"type":"photo","status_type":"added_photos","object_id":"1601663323414384","created_time":"2015-05-27T19:55:45+0000","updated_time":"2015-05-28T13:32:11+0000","shares":{"count":1},"is_hidden":false,"subscribed":true,"is_expired":false,"likes":{"data":[{"id":"10205538904806961","name":"Meli Giayetto"},{"id":"10203477793295535","name":"Carolina Godoy"},{"id":"824821730882398","name":"Paula Deus"},{"id":"447001425462934","name":"Maria Isabel Carbonell"},{"id":"1599726403644005","name":"Agos Carestia"},{"id":"10203766058055683","name":"Sol Schiller"},{"id":"10154251415838504","name":"Lugh Gmnz"},{"id":"10206934712106042","name":"Gabriela Bertolotto"},{"id":"869587076422870","name":"Luciane Dietrich"},{"id":"10152167967017032","name":"Pia Vanker"},{"id":"926075804093039","name":"Amanda Andressa da Silva"},{"id":"881861851838387","name":"Jorge Raul Martínez Mollo"},{"id":"604867082936258","name":"Chechu Cava"},{"id":"10206345222847184","name":"Mica Giayetto"},{"id":"10152593371223823","name":"Federico Martinez"},{"id":"10203707081740145","name":"Agustín Hige Díaz"},{"id":"321613968048341","name":"La Pepa"},{"id":"10205842581457043","name":"Chuleta Navaja"},{"id":"10203657202203610","name":"Pati de Olano"},{"id":"883123065084172","name":"Edgar Ferrer"},{"id":"10205231444132800","name":"Javier Rodriguez"}],"paging":{"cursors":{"after":"MTAyMDUyMzE0NDQxMzI4MDA=","before":"MTAyMDU1Mzg5MDQ4MDY5NjE="}}},"comments":{"data":[{"id":"1601663323414384_1601906020056781","from":{"id":"447001425462934","name":"Maria Isabel Carbonell"},"message":"que hermoso grupo","can_remove":true,"created_time":"2015-05-28T13:32:11+0000","like_count":0,"user_likes":false},{"id":"1601663323414384_1601676733413043","from":{"id":"10203657202203610","name":"Pati de Olano"},"message":"que maravilla!!!!!!!!!!!!!!","can_remove":true,"created_time":"2015-05-27T20:32:14+0000","like_count":0,"user_likes":false}],"paging":{"cursors":{"after":"MQ==","before":"Mg=="}}}},{"id":"1581878778726172_1597891350458248","from":{"category":"Community","name":"El Arcap2p","id":"1581878778726172"},"with_tags":{"data":[{"category":"Non-Governmental Organization (NGO)","name":"Incall / Producciones Sustentables","id":"1383680868545395"},{"category":"Musician/Band","name":"Yan Adrover","id":"157310947811219"},{"id":"10203650096307349","name":"Yan Adrover"},{"id":"740797382","name":"Ignacio Althabe"},{"id":"10205334811200598","name":"Gonzalo Serrano"},{"id":"10206932401253186","name":"Sergio Korn"}]},"message":"En la oficina movil del Arca nos encontramos con grandes músicos y amigos locales...","story":"El Arcap2p with Incall / Producciones Sustentables and 5 others in Villa General Belgrano (Cordoba)","picture":"https://scontent.xx.fbcdn.net/hphotos-xat1/v/t1.0-9/s130x130/11330048_1597891350458248_8187895895985320861_n.jpg?oh=924eeb8920d9ff4dec69339f26c77835&oe=560C8C87","link":"https://www.facebook.com/elarcap2p/photos/a.1594460990801284.1073741830.1581878778726172/1597891350458248/?type=1","icon":"https://www.facebook.com/images/icons/photo.gif","actions":[{"name":"Comment","link":"https://www.facebook.com/1581878778726172/posts/1597891350458248"},{"name":"Like","link":"https://www.facebook.com/1581878778726172/posts/1597891350458248"}],"privacy":{"value":"EVERYONE","description":"Public","friends":"","allow":"","deny":""},"place":{"id":"479411805414523","name":"Villa General Belgrano (Cordoba)","location":{"city":"Villa General Belgrano","country":"Argentina","latitude":-31.97871201521,"longitude":-64.559726753158}},"type":"photo","status_type":"added_photos","object_id":"1597891350458248","created_time":"2015-05-20T17:15:37+0000","updated_time":"2015-05-21T07:24:55+0000","is_hidden":false,"subscribed":true,"is_expired":false,"likes":{"data":[{"id":"687514181379376","name":"Pilar Figueroa"},{"id":"10205140746373019","name":"Fe Adrover"},{"id":"881861851838387","name":"Jorge Raul Martínez Mollo"},{"id":"10206854694028878","name":"Nicolas Tortone"},{"id":"10153328311414904","name":"Mariana Castro"},{"id":"10203707081740145","name":"Agustín Hige Díaz"},{"id":"883123065084172","name":"Edgar Ferrer"},{"id":"10201630715478892","name":"Claudia Canabal"}],"paging":{"cursors":{"after":"MTAyMDE2MzA3MTU0Nzg4OTI=","before":"Njg3NTE0MTgxMzc5Mzc2"}}},"comments":{"data":[{"id":"1597891350458248_1598247460422637","from":{"id":"881861851838387","name":"Jorge Raul Martínez Mollo"},"message":"M.B.","can_remove":true,"created_time":"2015-05-21T07:24:55+0000","like_count":0,"user_likes":false}],"paging":{"cursors":{"after":"MQ==","before":"MQ=="}}}},{"id":"1581878778726172_1595283284052388","from":{"category":"Community","name":"El Arcap2p","id":"1581878778726172"},"to":{"data":[{"category":"Arts/Entertainment/Nightlife","category_list":[{"id":"203916779633178","name":"Dance Instruction"},{"id":"200742186618963","name":"Vegetarian & Vegan Restaurant"},{"id":"133436743388217","name":"Arts & Entertainment"}],"name":"La Pepa","id":"321613968048341"}]},"with_tags":{"data":[{"id":"740797382","name":"Ignacio Althabe"},{"id":"10153900230778484","name":"Pato Bertolotto"},{"id":"10154957862405183","name":"Junior Adrover"},{"id":"10203650096307349","name":"Yan Adrover"}]},"message":"En La Pepa se trabaja a gusto! compartir este hermoso espacio es un verdadero placer...","message_tags":{"3":[{"id":"321613968048341","name":"La Pepa","type":"page","offset":3,"length":7}]},"story":"You added 19 new photos.","picture":"https://scontent.xx.fbcdn.net/hphotos-xtp1/v/t1.0-9/s130x130/11259612_1595278630719520_4292076579879310951_n.jpg?oh=5d29b8fcca14b94c0f61d29a3079ecd5&oe=560AE1BB","link":"https://www.facebook.com/elarcap2p/photos/a.1594460990801284.1073741830.1581878778726172/1595278630719520/?type=1","icon":"https://www.facebook.com/images/icons/photo.gif","actions":[{"name":"Comment","link":"https://www.facebook.com/1581878778726172/posts/1595283284052388"},{"name":"Like","link":"https://www.facebook.com/1581878778726172/posts/1595283284052388"}],"privacy":{"value":"EVERYONE","description":"Public","friends":"","allow":"","deny":""},"place":{"id":"321613968048341","name":"La Pepa","location":{"city":"Córdoba","country":"Argentina","latitude":-31.391146669119,"longitude":-64.183325185861,"street":"Isabel la católica 664","zip":"5001"}},"type":"photo","status_type":"added_photos","object_id":"1595278630719520","created_time":"2015-05-14T21:41:04+0000","updated_time":"2015-05-14T21:46:23+0000","shares":{"count":2},"is_hidden":false,"subscribed":true,"is_expired":false,"likes":{"data":[{"id":"869587076422870","name":"Luciane Dietrich"},{"id":"10204466472202477","name":"Rom Rom Rom"},{"id":"10206934712106042","name":"Gabriela Bertolotto"},{"id":"10152820678905770","name":"Bautista Logioco"},{"id":"604867082936258","name":"Chechu Cava"},{"id":"10204574090091292","name":"Flor Nieto"},{"id":"1581878778726172","name":"El Arcap2p"}],"paging":{"cursors":{"after":"MTU4MTg3ODc3ODcyNjE3Mg==","before":"ODY5NTg3MDc2NDIyODcw"}}}},{"id":"1581878778726172_1594596714121045","from":{"category":"Community","name":"El Arcap2p","id":"1581878778726172"},"with_tags":{"data":[{"id":"826484257404960","name":"Dieguillo Fotografió"},{"id":"10203650096307349","name":"Yan Adrover"},{"id":"740797382","name":"Ignacio Althabe"}]},"message":"Así se preparaban en La Plata nuestros Viajeros Robot antes de partir...","story":"You added 3 new photos.","picture":"https://fbcdn-sphotos-g-a.akamaihd.net/hphotos-ak-xfp1/v/t1.0-9/s130x130/11013590_1594596440787739_5491268175054781243_n.jpg?oh=734fd0ef1957e55f69511436227fc656&oe=55FA67D1&__gda__=1442630656_7bf8eb8de06a2ee84103ffe02b1a8c1e","link":"https://www.facebook.com/elarcap2p/photos/a.1594460990801284.1073741830.1581878778726172/1594596440787739/?type=1","icon":"https://www.facebook.com/images/icons/photo.gif","actions":[{"name":"Comment","link":"https://www.facebook.com/1581878778726172/posts/1594596714121045"},{"name":"Like","link":"https://www.facebook.com/1581878778726172/posts/1594596714121045"}],"privacy":{"value":"EVERYONE","description":"Public","friends":"","allow":"","deny":""},"place":{"id":"116532501690915","name":"La Plata, Buenos Aires","location":{"latitude":-34.9167,"longitude":-57.9333,"zip":"<<not-applicable>>"}},"type":"photo","status_type":"added_photos","object_id":"1594596440787739","created_time":"2015-05-13T00:33:48+0000","updated_time":"2015-05-13T03:28:27+0000","is_hidden":false,"subscribed":true,"is_expired":false,"likes":{"data":[{"id":"802697346466033","name":"Natalia Ugarte"},{"id":"10152611348136317","name":"Rebeca Ráez"},{"id":"10204466472202477","name":"Rom Rom Rom"}],"paging":{"cursors":{"after":"MTAyMDQ0NjY0NzIyMDI0Nzc=","before":"ODAyNjk3MzQ2NDY2MDMz"}}},"comments":{"data":[{"id":"1594596714121045_1594621860785197","from":{"id":"10152593371223823","name":"Federico Martinez"},"message":"ah y el stop motion","can_remove":true,"created_time":"2015-05-13T03:28:27+0000","like_count":2,"user_likes":true}],"paging":{"cursors":{"after":"MQ==","before":"MQ=="}}}},{"id":"1581878778726172_1594572537456796","from":{"category":"Community","name":"El Arcap2p","id":"1581878778726172"},"with_tags":{"data":[{"id":"10154957862405183","name":"Junior Adrover"},{"id":"10153324530044334","name":"German Fonzalida"},{"id":"827798687308331","name":"Fernando Agustín Rovaletti"},{"category":"Concert Venue","name":"Conciertos De Sillón","id":"270327723159632"},{"id":"10204574090091292","name":"Flor Nieto"},{"category":"Non-Governmental Organization (NGO)","name":"Incall / Producciones Sustentables","id":"1383680868545395"},{"id":"10205513140817631","name":"Ignacio Pello"},{"id":"740797382","name":"Ignacio Althabe"},{"id":"10203650096307349","name":"Yan Adrover"}]},"message":"el arca zarpo... el cielo se abrió... si lo imaginas, existe... www.elarcap2p.com","story":"El Arcap2p with Junior Adrover and 8 others at La Pepa","picture":"https://fbcdn-sphotos-g-a.akamaihd.net/hphotos-ak-xaf1/v/t1.0-9/q91/s130x130/22626_1594572537456796_1685899045595608154_n.jpg?oh=d9c36703ccd2c210763675309bb5d8ea&oe=5604CD1B&__gda__=1438717934_e8a1c338cbbcb00aa6fbfaf245c2127f","link":"https://www.facebook.com/elarcap2p/photos/a.1594460990801284.1073741830.1581878778726172/1594572537456796/?type=1","icon":"https://www.facebook.com/images/icons/photo.gif","actions":[{"name":"Comment","link":"https://www.facebook.com/1581878778726172/posts/1594572537456796"},{"name":"Like","link":"https://www.facebook.com/1581878778726172/posts/1594572537456796"}],"privacy":{"value":"EVERYONE","description":"Public","friends":"","allow":"","deny":""},"place":{"id":"321613968048341","name":"La Pepa","location":{"city":"Córdoba","country":"Argentina","latitude":-31.391146669119,"longitude":-64.183325185861,"street":"Isabel la católica 664","zip":"5001"}},"type":"photo","status_type":"added_photos","object_id":"1594572537456796","created_time":"2015-05-12T21:32:36+0000","updated_time":"2015-05-12T21:32:36+0000","is_hidden":false,"subscribed":true,"is_expired":false,"likes":{"data":[{"id":"902807329776472","name":"Rosario Zingoni"},{"id":"788052601234204","name":"Luis Althabe"},{"id":"10203707081740145","name":"Agustín Hige Díaz"},{"id":"710608932351708","name":"Pao Cuello"},{"id":"754357384650062","name":"Nayra Carvalho"},{"id":"10152611348136317","name":"Rebeca Ráez"},{"id":"10204466472202477","name":"Rom Rom Rom"},{"id":"10152820678905770","name":"Bautista Logioco"},{"id":"10203657202203610","name":"Pati de Olano"},{"id":"881861851838387","name":"Jorge Raul Martínez Mollo"},{"id":"10204478981763372","name":"Evan Ge"}],"paging":{"cursors":{"after":"MTAyMDQ0Nzg5ODE3NjMzNzI=","before":"OTAyODA3MzI5Nzc2NDcy"}}}}],"paging":{"next":"https://graph.facebook.com/v2.0/1581878778726172/feed?limit=50&with=location&access_token=CAACEdEose0cBANMkRQv20sn8KjKfePDoNE73VP0IA9d1xmkWbqfE3sCaUpJWTjvZBPQkHAGkczHy8v7gAmZBuFZB8zfarEV516CC4heHbAO31lBChhARJNwKMjRBsquMcrSxL8X9pqDZBNrP5Pr8NTpktwbcSHAuR8QryQ8VRBwdZCoWFXqwuIcIlYBKTeJFXXVaG6pxPZCgZDZD&until=1431466356&__paging_token=enc_AdCNzxvZAGboae8Y4KLn1TBCcYfHDZB2zqKZBLkSzqTI8uQi3ZBlW6LmCLQiP3p4uurH9Qbqoa29ZALZAFFVY0wSgZBwXFxZBrbCRS220VGQUxuUkasjKgZDZD"}}'));
      function getPage(params) {
        if (!(params || false)) {
          params = {
            with: 'location'
          };
        };
        params.access_token = accessToken;
        FB.api(user_name + '/feed', params, function(result) {
          if (!result || result.error) {
            return reject(result.error);
          }
          response = response.concat(result.data);
          current_iteration++;
          if (current_iteration <= iterations && (result.paging || false)) {
            var next_params = url.parse(result.paging.next, true);
            getPage(next_params.query);
          } else {
            return resolve(response);
          }
        });
      };
      getPage();
    })
  },
  createFeed: function(_feed, user_name) {
    return new Promise(function(resolve, reject) {
      Feed.findOne({
        origin_id: _feed.id
      }).exec(function createCB(err, feed) {
        if (feed) return resolve(false);

        var feed = {
          origin_id: _feed.id,
          origin: 'fb',
          media_type: _feed.type,
          link: _feed.link,
          created_at: _feed.created_time,
          user: user_name,
          type: _feed.type
        };
        if (_feed.place) {
          feed.location = [_feed.place.location.longitude, _feed.place.location.latitude];
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
