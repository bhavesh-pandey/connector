var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require ('passport-local-mongoose');

var Expert = new Schema(
    {
        expertId: Number,
        requestId: String,
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
        selectedCountries: [],
        selectedCountriesText:[],
        selectedSpeciality:[],
        role: {
            type: String,
            default: 'expert'
        },
        profileType: {
            type: String,
            default: 'local'
        },
        imageUrl: {
            type: String,
            default: '../images/avatar.jpg'
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

Expert.plugin(passportLocalMongoose);

module.exports = mongoose.model('Expert', Expert);