var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExpertRequest = new Schema(
    {
        expertId: Number,
        title: String,
        firstname: String,
        lastname: String,
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
        isApproved: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('ExpertRequest', ExpertRequest);