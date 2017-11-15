var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Service = new Schema (
    {
        serviceId: Number,
        userInfo: {
            _id: String,
            title: String,
            firstname: String,
            lastname: String,
            email: String,
            phone: Number,
            dob: String,
            companyName : String,
            companyVAT : String,
            companyCountry : String,
            city : String,
            address : String,
            postalCode : String,
            mobile : Number,
            role: String,
            profileType: String,
            imageUrl: String
        },
        servicesRequested: [],
        servicesRequestedText: [],
        region: String,
        countries: [],
        countryNames: [],
        comments: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Service', Service);
