var express = require('express');
var bodyParser = require('body-parser');
var User = require('../models/user');
var Service = require('../models/service');
var passport = require('passport');
var Verify = require('./verify');
var ObjectId = require('mongodb').ObjectID;

var serviceRouter = express.Router();

serviceRouter.use(bodyParser.json());

require("./mailin.js");
var client = new Mailin("https://api.sendinblue.com/v2.0","cfzbnOM6YqS74Edj",5000);	//Optional parameter: Timeout in MS

var data = { "type":"classic",
    "status":"queued",
    "page":1,
    "page_limit":10
};

client.get_campaigns_v2(data).on('complete', function(data) {
});

serviceRouter.route('/create')

    .post(function (req, res, next) {
        var serviceId =  Math.floor(100000000000 + Math.random() * 900000000000);
        req.body.serviceId = serviceId;
        Service.create(req.body, function (err, service) {
            if (err) {
                return res.status(500).send(err);
            }

            User.findOne({_id: req.body.userInfo._id}, function (err, user) {
                if (err) {
                    return res.status(500).send(err);
                }
                var data = {
                    _id: service._id,
                    region: service.region,
                    serviceId: service.serviceId,
                    countryNames: service.countryNames,
                    servicesRequestedText: service.servicesRequestedText
                };
                user.services.push(data);
                user.save(function (err, user) {
                    if (err) {
                        return res.status(500).send(err);
                    }

                    var data = { "id" : 5,
                        "to" : req.body.userInfo.email,
                        "replyto" : "connector@connector.expert",
                        "attr" : {
                            "name": req.body.userInfo.title + ' ' + req.body.userInfo.firstname + ' ' + req.body.userInfo.lastname,
                            "number" : serviceId,
                            "services": req.body.servicesRequestedText.join(', '),
                            "region": req.body.region,
                            "countries": req.body.countryNames.join(', ')
                        },
                        "headers" : {"Content-Type": "text/html;charset=iso-8859-1", "X-param1": "value1", "X-param2": "value2", "X-Mailin-custom":"my custom value","X-Mailin-tag":"my tag value"}
                    };

                    client.send_transactional_template(data).on('complete', function(data) {
                        console.log(data);

                        var data = { "id" : 6,
                            "to" : "connector@connector.expert",
                            "replyto" : req.body.userInfo.email,
                            "attr" : {
                                "name": req.body.userInfo.title + ' ' + req.body.userInfo.firstname + ' ' + req.body.userInfo.lastname,
                                "number" : serviceId,
                                "services": req.body.servicesRequestedText.join(', '),
                                "region": req.body.region,
                                "countries": req.body.countryNames.join(', ')
                            },
                            "headers" : {"Content-Type": "text/html;charset=iso-8859-1", "X-param1": "value1", "X-param2": "value2", "X-Mailin-custom":"my custom value","X-Mailin-tag":"my tag value"}
                        };

                        client.send_transactional_template(data).on('complete', function(data) {
                            return res.status(200).send(service);
                        })

                    })

                })
            })
        })
    });

module.exports = serviceRouter;