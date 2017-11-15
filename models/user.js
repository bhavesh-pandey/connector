var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require ('passport-local-mongoose');

var User = new Schema(
    {
        userId: Number,
        title: String,
        firstname: String,
        lastname: String,
        username: {
            type: String,
            unique: true
        },
        email: {
            type: String,
            unique: true
        },
        dob: String,
        companyName : String,
        companyVAT : String,
        companyCountry : String,
        city : String,
        address : String,
        postalCode : Number,
        phone: Number,
        mobile : Number,
        role: {
            type: String,
            default: 'user'
        },
        profileType: {
            type: String,
            default: 'local'
        },
        imageUrl: {
            type: String,
            default: '../images/avatar.jpg'
        },
        services: [],
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);