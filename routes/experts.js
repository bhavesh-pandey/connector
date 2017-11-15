var express = require('express');
var bodyParser = require('body-parser');
var Expert = require('../models/expert');
var ExpertRequest = require('../models/expertRequest');
var passport = require('passport');
var Verify = require('./verify');
var ObjectId = require('mongodb').ObjectID;

var expertRouter = express.Router();

expertRouter.use(bodyParser.json());

require("./mailin.js");
var client = new Mailin("https://api.sendinblue.com/v2.0","cfzbnOM6YqS74Edj",5000);	//Optional parameter: Timeout in MS

data = { "type":"classic",
    "status":"queued",
    "page":1,
    "page_limit":10
};

client.get_campaigns_v2(data).on('complete', function(data) {
});

var openConnections = [];

expertRouter.route('/expertRequestStatus')

    .get(function (req, res, next) {
        req.socket.setTimeout(100000000000000000000);

        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });
        res.write('\n');

        openConnections.push(res);

        req.on("close", function() {
            var toRemove;
            for (var j =0 ; j < openConnections.length ; j++) {
                if (openConnections[j] == res) {
                    toRemove =j;
                    break;
                }
            }
            openConnections.splice(j,1);
            console.log(openConnections.length);
        });
    });

function sendUpdate(data) {
    openConnections.forEach(function(resp) {
        var d = new Date();
        resp.write('id:' + d.getMilliseconds() + '\n');
        resp.write('data:' + JSON.stringify(data) + '\n\n');
    });
}


expertRouter.route('/application')
    .post(function (req, res, next) {
        var expertId =  Math.floor(100000000000 + Math.random() * 900000000000);
        req.body.expertId = expertId;
        ExpertRequest.create(req.body, function (err, user) {
            if (err) {
                return res.status(500).send(err);
            }
            sendUpdate(user);

            data = { "id" : 7,
                "to" : "connector@connector.expert",
                "replyto" : req.body.email,
                "attr" : {
                    "name": req.body.firstname + ' ' + req.body.lastname,
                    "email" : req.body.email
                },
                "headers" : {"Content-Type": "text/html;charset=iso-8859-1", "X-param1": "value1", "X-param2": "value2", "X-Mailin-custom":"my custom value","X-Mailin-tag":"my tag value"}
            };

            client.send_transactional_template(data).on('complete', function(data) {
                console.log(data);
                return res.status(200).send(user);
            });
        })
    });


expertRouter.route('/approveExpert')

    .post(function (req, res, next) {

        Expert.register(new Expert({username: req.body.username}), req.body.password, function (err, user) {
            if (err) {
                return res.status(500).send(err);
            }
            ExpertRequest.findOne({_id: req.body._id}, function (err, request) {
                if (err) {
                    return res.status(500).send(err);
                }
                request.isApproved = true;
                delete req.body._id;
                req.body.requestId = request._id;
                user.update(req.body, {new : true}, function (err, user) {
                    if (err) {
                        Expert.remove({username: req.body.username}, function (err, result) {
                            return res.status(500).send({message: 'An expert with the given E-mail is already registered'});
                        });
                    }
                    request.save(function (err, request) {
                        if (err) {
                            return res.status(500).send(err);
                        }

                        data = { "id" : 4,
                            "to" : req.body.email,
                            "replyto" : "connector@connector.expert",
                            "attr" : {
                                "username": req.body.username,
                                "password" : req.body.password
                            },
                            "headers" : {"Content-Type": "text/html;charset=iso-8859-1", "X-param1": "value1", "X-param2": "value2", "X-Mailin-custom":"my custom value","X-Mailin-tag":"my tag value"}
                        };

                        client.send_transactional_template(data).on('complete', function(data) {
                            console.log(data);
                            return res.status(200).send(user);
                        });
                    })
                })
            })
        });
    });

expertRouter.route('/login')

    .post(function (req, res, next) {
        passport.authenticate('expert', function (err, user, info) {
            if (err) {
                return res.status(500).send(err);
            }

            if (info) {
                return res.status(401).send(info);
            }

            if(!user) {
                return res.status(401).send(info);
            }

            req.logIn(user, function (err) {
                if (err){
                    return res.status(500).send(err);
                }
            });
            var token = Verify.getToken({"username": user.username, "_id":user._id, "role": user.role});

            res.status(200).send({
                message: 'Login successful',
                success: true,
                user: user,
                token: token
            });
        })(req, res, next);
    });



expertRouter.route('/revalidate')

    .post(function (req, res, next) {
        Expert.findOne({_id: req.body.userId}, function (err, user) {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).send(user);
        })
    });


expertRouter.route('/updateProfile')

    .post(function (req, res, next) {
        Expert.findOneAndUpdate({_id : req.body._id}, req.body, {new : true}, function (err, user) {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).send(user);
        })
    });

expertRouter.route('/deleteRequest')

    .post(function (req, res, next) {
        ExpertRequest.find({_id : req.body._id}).remove(function () {
            return res.status(200).send({
                message: 'Expert request deleted successfully'
            });
        });
    });

expertRouter.route('/deleteExpert')

    .post(function (req, res, next) {
        ExpertRequest.find({_id : req.body.requestId}).remove(function () {
            Expert.find({_id : req.body._id}).remove(function () {
                return res.status(200).send({
                    message: 'Expert deleted successfully'
                });
            })
        });
    });

expertRouter.route('/forgot')

    .post(function (req, res, next) {
        Expert.findOne({email: req.body.email}, function (err, user) {
            if (err) {
                console.log("Error while sending forgot password mail "+err);
                return res.status(400).send(err);
            }
            if (user){
                if (user.lastname == req.body.lastname && user.dob == req.body.dob){
                    var token = Verify.getToken({"username": user.username, "_id":user._id, "role": user.role});
                    link = 'http://connector.us-west-2.elasticbeanstalk.com/expert-reset-password/' + token;
                    linkwithouthttp = 'connector.us-west-2.elasticbeanstalk.com/expert-reset-password/' + token;
                    data = { "id" : 1,
                        "to" : req.body.email,
                        "replyto" : "connector@connector.expert",
                        "attr" : {
                            "link": link,
                            "linkwithouthttp" : linkwithouthttp,
                            "username": user.username
                        },
                        "headers" : {"Content-Type": "text/html;charset=iso-8859-1", "X-param1": "value1", "X-param2": "value2", "X-Mailin-custom":"my custom value","X-Mailin-tag":"my tag value"}
                    };

                    client.send_transactional_template(data).on('complete', function(data) {
                        console.log(data);
                        return res.status(200).send(user);
                    })
                }
                else {
                    return res.status(400).send({message: 'Information provided by you is not correct, please try again'});
                }
            }
            else {
                return res.status(400).send({message: 'User not found! Please SignUp'});
            }
        });
    });


expertRouter.route('/reset')
    .put(Verify.verifyUser, function (req, res, next) {
        Expert.findOne({_id: ObjectId(req.decoded._id)}, function(err, user){
            if(err){
                return res.status(400).send(err);
            }
            user.setPassword(req.body.new_password, function (err, user) {
                if(err){
                    return res.status(400).send(err);
                }
                user.save(function (err, user) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    return res.status(200).send(user);
                });
            });
        });
    });


expertRouter.route('/inquiry')

    .post(function (req, res, next) {
        data = { "id" : 2,
            "to" : 'connector@connector.expert',
            "replyto" : req.body.email,
            "attr" : {
                "name": req.body.name,
                "email" : req.body.email,
                "query": req.body.comments
            },
            "headers" : {"Content-Type": "text/html;charset=iso-8859-1", "X-param1": "value1", "X-param2": "value2", "X-Mailin-custom":"my custom value","X-Mailin-tag":"my tag value"}
        };

        client.send_transactional_template(data).on('complete', function(data) {
            console.log(data);
            return res.status(200).send({message: 'E-mail sent, we will contact you'});
        })
    });


module.exports = expertRouter;
