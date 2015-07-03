/**
 * Forms/subiteController
 *
 * @description :: Server-side logic for managing forms/subites
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var mandrill = require('mandrill-api/mandrill'),
  validator = require('validator'),
  mandrill_client = new mandrill.Mandrill('kVE4CFB1FPaZai__bOKjXA');

module.exports = {
  index: function(req, res) {
    var params = req.allParams();

    params.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    Contacto.create(params).exec(function createCB(err, created) {
      res.send();
      var message = {
        "text": JSON.stringify(created),
        "subject": "Contacto",
        "from_email": (validator.isEmail(created.email)) ? created.email : 'anonimo@cualquiera.ass',
        "from_name": created.nombre,
        "to": [{
          "email": "hola@elarcap2p.com",
          "name": "El Arcap2p",
          "type": "to"
        }]
      };
      mandrill_client.messages.send({
        "message": message,
        "async": false
      });
    });
  },

  all: function(req, res) {
    Contacto.find({}).exec(function createCB(err, contactos) {
      res.send(contactos);
    });
  }
};
