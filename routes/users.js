var express = require('express');
var bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');
var Verify = require('./verify');
var ObjectId = require('mongodb').ObjectID;

var userRouter = express.Router();

userRouter.use(bodyParser.json());

require("./mailin.js");
var client = new Mailin("https://api.sendinblue.com/v2.0","cfzbnOM6YqS74Edj",5000);	//Optional parameter: Timeout in MS

var data = { "type":"classic",
    "status":"queued",
    "page":1,
    "page_limit":10
};

client.get_campaigns_v2(data).on('complete', function(data) {
});


userRouter.route('/signup')

    .post(function (req, res, next) {
        User.register(new User({username: req.body.username}), req.body.password, function (err, user) {
            if (err) {
                return res.status(500).send(err);
            }

            var userId =  Math.floor(100000000000 + Math.random() * 900000000000);
            req.body.userId = userId;

            User.findOneAndUpdate({_id : user._id}, req.body, {new : true}, function (err, user) {
                if (err) {
                    User.remove({username: req.body.username}, function (err, result) {
                        return res.status(500).send({message: 'A user with the given E-mail is already registered'});
                    });
                }

                var data = { "id" : 3,
                    "to" : req.body.email,
                    "replyto" : "connector@connector.expert",
                    "attr" : {
                        "username": req.body.username,
                        "password" : req.body.password
                    },
                    "headers" : {"Content-Type": "text/html;charset=iso-8859-1", "X-param1": "value1", "X-param2": "value2", "X-Mailin-custom":"my custom value","X-Mailin-tag":"my tag value"}
                };

                client.send_transactional_template(data).on('complete', function(data) {
                    passport.authenticate('local')(req, res, function () {
                        var token = Verify.getToken({"username": user.username, "_id":user._id, "role": user.role});

                        res.status(200).send({
                            message: 'Login successful',
                            success: true,
                            user: user,
                            token: token
                        });
                    });
                });
            })
        });
    });

userRouter.route('/login')

    .post(function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
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



userRouter.route('/revalidate')

    .post(function (req, res, next) {
        User.findOne({_id: req.body.userId}, function (err, user) {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).send(user);
        })
    });


userRouter.route('/updateProfile')

    .post(function (req, res, next) {
        User.findOneAndUpdate({_id : req.body._id}, req.body, {new : true}, function (err, user) {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).send(user);
        })
    });

userRouter.route('/forgot')

    .post(function (req, res, next) {
        User.findOne({email: req.body.email}, function (err, user) {
            if (err) {
                console.log("Error while sending forgot password mail "+err);
                return res.status(400).send(err);
            }
            if (user){
                if (user.lastname == req.body.lastname && user.dob == req.body.dob){
                    var token = Verify.getToken({"username": user.username, "_id":user._id, "role": user.role});
                    link = 'http://connector.us-west-2.elasticbeanstalk.com/reset-password/' + token;
                    linkwithouthttp = 'connector.us-west-2.elasticbeanstalk.com/reset-password/' + token;
                    var data = { "id" : 1,
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


userRouter.route('/reset')
    .put(Verify.verifyUser, function (req, res, next) {
        User.findOne({_id: ObjectId(req.decoded._id)}, function(err, user){
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

userRouter.route('/deleteUser')

    .post(function (req, res, next) {
        User.find({_id : req.body._id}).remove(function () {
            return res.status(200).send({
                message: 'Customer deleted successfully'
            });
        });
    });


module.exports = userRouter;
