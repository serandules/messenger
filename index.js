var log = require('logger')('messenger');
var fs = require('fs');
var async = require('async');

var utils = require('utils');

var array = function (o) {
  if (!o) {
    return null;
  }
  return Array.isArray(o) ? o : [o];
};

exports.email = function (data, done) {
  utils.ses().sendEmail({
    Destination: {
      BccAddresses: array(data.bcc),
      CcAddresses: array(data.cc),
      ToAddresses: array(data.to)
    },
    Message: {
      Body: {
        Html: {
          Data: data.html,
          Charset: 'UTF-8'
        },
        Text: {
          Data: data.text,
          Charset: 'UTF-8'
        }
      },
      Subject: {
        Data: data.subject,
        Charset: 'UTF-8'
      }
    },
    Source: data.from,
    ConfigurationSetName: null,
    ReplyToAddresses: array(data.reply),
    ReturnPath: null,
    ReturnPathArn: null,
    SourceArn: null,
    Tags: array(data.tags)
  }, function (err, data) {
    if (err) {
      return done(err);
    }
    done(null, data);
  });
};
