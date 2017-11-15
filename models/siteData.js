var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Sitedata = new Schema (
    {
        page: String,
        content: {}
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Sitedata', Sitedata);
