var express = require('express');
var bodyParser = require('body-parser');
var User = require('../models/user');
var Service = require('../models/service');
var Expert = require('../models/expert');
var ExpertRequest = require('../models/expertRequest');
var Sitedata = require('../models/siteData');
var passport = require('passport');
var multer = require('multer');
var Verify = require('./verify');
var ObjectId = require('mongodb').ObjectID;
var http = require('http');

var manageRouter = express.Router();

manageRouter.use(bodyParser.json());

manageRouter.route('/getAllCustomers')
    .get(function (req, res, next) {
        User.find({}, function (err, user) {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).send(user);
        })
    });

manageRouter.route('/getAllServices')
    .get(function (req, res, next) {
        Service.find({}, function (err, user) {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).send(user);
        })
    });

manageRouter.route('/getAllExpertRequests')
    .get(function (req, res, next) {
        ExpertRequest.find({isApproved: false}, function (err, user) {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).send(user);
        })
    });

manageRouter.route('/getAllExperts')
    .get(function (req, res, next) {
        Expert.find(function (err, user) {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).send(user);
        })
    });

manageRouter.route('/getAllSiteData')
    .get(function (req, res, next) {
        Sitedata.find({}, function (err, user) {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).send(user);
        })
    });

manageRouter.route('/getSiteData/:page')
    .get(function (req, res, next) {
        Sitedata.findOne({page: req.params.page}, function (err, user) {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).send(user);
        })
    });

manageRouter.route('/createSiteData')
    .post(function (req, res, next) {
        var data = {
            page: 'footer',
            content: {
                Heading:{
                    name: 'Heading',
                    data: null
                }
            }
        };
        Sitedata.create(data , function (err, data) {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).send(data);
        });
    });

manageRouter.route('/updateSiteData')
    .post(function (req, res, next) {
        Sitedata.findOne({page: req.body.page}, function (err, sitedata) {
            if (err) {
                return res.status(500).send(err);
            }

            key = req.body.name.replace(/\s/g,'');

            value = {
                name: req.body.name,
                data: req.body.data
            };

            updateString = 'content.'+key.toString();

            var toUpdate = {};
            toUpdate[updateString] = value;

            sitedata.update({$set: toUpdate}, {new : true, upsert: true}, function (err, sitedata) {
                if (err) {
                    return res.status(500).send(err);
                }
                return res.status(200).send(sitedata);
            })
        })
    });


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({
    storage: storage
}).single('file');


manageRouter.route('/upload')
    .post(function (req, res, next) {
        upload(req,res,function(err){
            if(err){
                return res.status(500).send(err);
            }
            return res.status(200).send('Success');
        })
    });


module.exports = manageRouter;