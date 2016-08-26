'use strict';

const util = require('util');
const geolib = require('geolib');
const managers = require('../../config/managers.json');

module.exports = {
  find: find
};

function find(req, res) {
  var longitude = req.swagger.params.lng.value;
  var latitude = req.swagger.params.lat.value;

  var manager = geolib.findNearest({ latitude: latitude, longitude: longitude }, managers, 0);
  manager ? res.json(manager.key) : res.status(404).send('Manager not found');
}
