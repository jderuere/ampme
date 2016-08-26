'use strict';

const util = require('util');
const uuid = require('uuid');

const parties = {};
const participants = {};

module.exports = {
  add: add,
  join: join
};

function add(req, res) {
  const deviceId = req.body.device_id;
  var party = {
    status_code: 'ON GOING',
    party_code: uuid.v1(), // Generate a v1 (time-based) id
    participant_id: 0,
    device_id: deviceId
  };

  parties[party.party_code] = party;
  res.status(200).json(party);
}

function join(req, res) {
  const partyCode = req.swagger.params.party_code.value;
  var party = parties[partyCode];
  party.participant_id++;
  if (participants[partyCode]) {
    participants[partyCode].push({ deviceId: req.body.device_id, participantName: req.body.participant_name })
  } else {
    participants[partyCode] = [{ deviceId: req.body.device_id, participantName: req.body.participant_name }];
  }
  res.status(200).json(party);
}

