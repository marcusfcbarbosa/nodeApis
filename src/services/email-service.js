'use strict';

var config = require('../config');
var sendGrid = require('sendgrid');

exports.send = async (to, subject, body) => {
    sendGrid.setApiKey(config.sendgridKey);
    const msg = {
        to: to,
        from: global.EMAIL_SENDER,
        subject: subject,
        text: 'and easy to do anywhere, even with Node.js',
        html: body
    };
    sendGrid.send(msg);
}

